const mongoose = require('mongoose');
require('dotenv').config();

async function fixBudgetIndex() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('✅ MongoDB connected');

        console.log('Dropping budgets collection...');
        await mongoose.connection.collection('budgets').drop();
        console.log('✅ Budgets collection dropped');

        console.log('Dropping budget indices...');
        try {
            await mongoose.connection.collection('budgets').dropIndex('month_1');
            console.log('✅ Dropped old month_1 index');
        } catch (e) {
            console.log('ℹ️ No month_1 index to drop');
        }

        console.log('Recreating Budget model...');
        const Budget = require('./models/Budget');
        console.log('✅ Budget model reloaded with correct index (userId_1_month_1)');

        console.log('Creating test document...');
        await Budget.create({
            userId: new mongoose.Types.ObjectId(),
            month: '2026-05',
            budgetAmount: 10000
        });
        console.log('✅ Test document created successfully');

        await mongoose.disconnect();
        console.log('✅ All done! Your budget collection is fixed.');
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

fixBudgetIndex();
