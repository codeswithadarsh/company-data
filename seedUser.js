const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const uri = 'mongodb+srv://codewithadarsh:adarsh569@sdeadarsh569.rfwjqwt.mongodb.net/company_data_demo?retryWrites=true&w=majority';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

const User = mongoose.model('User', userSchema);

async function seedUser() {
    try {
        const password = bcrypt.hashSync('demo', 10);
        const user = new User({ username: 'admin', password });
        await user.save();
        console.log('User seeded successfully');
        mongoose.connection.close();
    } catch (err) {
        console.error('Error seeding user:', err);
        mongoose.connection.close();
    }
}

seedUser();
