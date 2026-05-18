const Donation = require('../models/Donation');

const parseLocation = (location) => {
  if (typeof location !== 'string') {
    return location;
  }

  try {
    return JSON.parse(location);
  } catch {
    return null;
  }
};

// @desc    Create a new donation
// @route   POST /api/donations
// @access  Private (Donors only)
const createDonation = async (req, res) => {
  try {
    const { category, foodType, quantity, bestBefore, location } = req.body;
    const parsedLocation = parseLocation(location);

    if (!parsedLocation) {
      return res.status(400).json({
        success: false,
        message: 'Invalid location data. Please select a valid pickup location.',
      });
    }

    const newDonation = new Donation({
      donor: req.user.id,
      category,
      foodType,
      quantity,
      bestBefore,
      location: parsedLocation,
      image: req.file ? req.file.path : '',
    });

    const savedDonation = await newDonation.save();
    res.status(201).json(savedDonation);
  } catch (error) {
    console.error('Create Donation Error:', error.message);

    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to create donation due to a server error.',
    });
  }
};

const markExpiredDonationsAsWasted = async () => {
  await Donation.updateMany(
    {
      status: 'available',
      bestBefore: { $lt: new Date() },
    },
    {
      $set: { status: 'wasted' },
    }
  );
};

// @desc    Get all available donations
// @route   GET /api/donations
// @access  Public
const getAvailableDonations = async (req, res) => {
  try {
    await markExpiredDonationsAsWasted();

    const donations = await Donation.find({
      status: 'available',
      bestBefore: { $gt: new Date() },
    })
      .populate('donor', 'name')
      .sort({ createdAt: -1 });

    res.json(donations);
  } catch (error) {
    console.error('Fetch Available Donations Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Unable to retrieve available donations at this time. Please try again later.',
    });
  }
};

// @desc    Claim a donation (handles race conditions)
// @route   PUT /api/donations/:id/claim
// @access  Private (Receivers only)
const claimDonation = async (req, res) => {
  try {
    const { id: donationId } = req.params;
    const receiverId = req.user.id;
    const updatedDonation = await Donation.findOneAndUpdate(
      { _id: donationId, status: 'available' },
      {
        status: 'delivered',
        receiver: receiverId,
      },
      { new: true }
    );

    if (!updatedDonation) {
      return res.status(409).json({
        success: false,
        message: 'This donation is no longer available - it has already been delivered by another user. Please browse other available donations.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Donation delivered successfully! The donor will be notified.',
      donation: updatedDonation,
    });
  } catch (error) {
    console.error('Claim Donation Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to claim donation due to a server error. Please try again later.',
    });
  }
};

// @desc    Get all donations for the logged-in donor
// @route   GET /api/donations/mydonations
// @access  Private (Donors only)
const getMyDonations = async (req, res) => {
  try {
    await markExpiredDonationsAsWasted();

    const donations = await Donation.find({ donor: req.user.id }).sort({ createdAt: -1 });
    res.json(donations);
  } catch (error) {
    console.error('Fetch My Donations Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Unable to retrieve your donations at this time. Please try again later.',
    });
  }
};

// @desc    Get all delivered donations for the logged-in receiver
// @route   GET /api/donations/myclaims
// @access  Private (Receivers only)
const getMyClaims = async (req, res) => {
  try {
    const donations = await Donation.find({ receiver: req.user.id }).sort({ createdAt: -1 });
    res.json(donations);
  } catch (error) {
    console.error('Fetch My Claims Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Unable to retrieve your delivered donations at this time. Please try again later.',
    });
  }
};

module.exports = {
  createDonation,
  getAvailableDonations,
  claimDonation,
  getMyDonations,
  getMyClaims,
};

