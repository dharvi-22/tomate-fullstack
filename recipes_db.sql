-- Drop table with safety check
DROP TABLE IF EXISTS hacks;


-- Create the hacks table
CREATE TABLE hacks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    tip TEXT,
    category ENUM('batch', 'freezer') NOT NULL
);

-- Insert values ('Title', 'Description', 'Tip', 'freezer/batch') 5 each
INSERT INTO hacks (title, description, tip, category) 
VALUES 
('Freezer Smoothie Packs', 'Pre-portion smoothie ingredients in freezer bags', 'Add fruits and veggies to bags, just add liquid when ready', 'freezer'),
('Chickpeas On The Go', 'Pre-cook a batch of chickpeas and store them in a freezer friendly container', 'Save yourself the hassle of cooking them whenever you make a salad, wrap or a stew', 'freezer'),
('Pasta Till Next Day', '1 cup pasta = 1 portion, therefore 2 cups = take a guess... Cook the 2 cups and save make yourself dinner and lunch for the next day', 'Store cooked pasta in the fridge and eat it in less than 24h', 'batch'),
('Ready Breakfast Burritos', 'Assemble breakfast burritos and freeze individually', 'Wrap in foil or parchment, microwave from frozen for quick breakfasts', 'freezer'),
('Grain Prep', 'Cook large quantities of quinoa, rice, and other grains', 'Store in fridge for up to 5 days, use as base for multiple meals', 'batch'),
('Meat Marinade', 'Marinate multiple proteins in different bags', 'Freeze meat in marinades, thaw and cook when ready', 'batch'),
('Ice Cube Herb Preservation', 'Freeze fresh herbs in olive oil using ice cube trays', 'Pop out cubes to add instant flavor to cooking', 'freezer'),
('Ready Cookie Dough', 'Make large batches of cookie dough and portion into scoops', 'Freeze scooped dough on trays, then transfer to bags for fresh cookies anytime', 'freezer'),
('Roasted Vegetables', 'Roast large sheet pans of mixed vegetables at once', 'Use different seasoning combinations, store in fridge for easy meal additions', 'batch'),
('Quick Sauce Making', 'Make large quantities of versatile sauces and dressings', 'Prepare tomato sauce, pesto, and salad dressings in bulk, store in jars', 'batch');