
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());
app.use(express.static('public')); // This line serves static files from the public directory

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/contactsDB');

const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String
});

const Contact = mongoose.model('Contact', contactSchema);

// Routes
app.post('/addContact', (req, res) => {
    const newContact = new Contact(req.body);
    newContact.save()
        .then(() => {
            res.json({ success: true });
        })
        .catch(err => {
            res.status(500).json({ success: false, message: err.message });
        });
});

app.get('/getContacts', (req, res) => {
    Contact.find()
        .then(contacts => {
            res.json(contacts);
        })
        .catch(err => {
            res.status(500).json({ success: false, message: err.message });
        });
});




app.delete('/deleteContact/:id', (req, res) => {
    Contact.findByIdAndDelete(req.params.id)
        .then(() => {
            res.json({ success: true });
        })
        .catch(err => {
            res.status(500).json({ success: false, message: err.message });
        });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
