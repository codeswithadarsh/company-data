const mongoose = require('mongoose');
const csvtojson = require('csvtojson');
const path = require('path');

// MongoDB connection string
const uri = 'mongodb+srv://codewithadarsh:adarsh569@sdeadarsh569.rfwjqwt.mongodb.net/company_data_demo?retryWrites=true&w=majority';

mongoose.connect(uri);

const companySchema = new mongoose.Schema({
    entity: String,
    sector: String,
    email: String,
    incorporation: String,
    address: String,
    revenue: Number,
    website: String,
    is_verified: Boolean
});

const Company = mongoose.model('Company', companySchema);

async function importData() {
    try {
        const jsonArray = await csvtojson().fromFile(path.join(__dirname, 'company_data.csv'));

        const companies = jsonArray.map(item => ({
            entity: item.entity,
            sector: item.sector,
            email: item.email,
            incorporation: item.incorporation,
            address: item.address,
            revenue: isNaN(parseFloat(item.revenue)) ? 0 : parseFloat(item.revenue),
            website: item.website,
            // Check for is_verified field and provide a default value
            is_verified: item.is_verified ? item.is_verified.toLowerCase() === 'true' : false
        }));

        await Company.insertMany(companies);
        console.log('Data imported successfully');
    } catch (err) {
        console.error('Error importing data:', err);
    } finally {
        mongoose.connection.close();
    }
}

importData();
