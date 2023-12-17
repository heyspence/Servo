require "open-uri"

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

puts "Creating Restaurants"

restaurant = Restaurant.create([
    { name: 'Ease Window Cleaning', image_url: "https://spencerheywood.com/images/servo/highlights/E22A2993.jpg", icon_image_url: "http://spencerheywood.com/images/dash_door/starbucks-logo.05"},
    { name: 'Ease Window Cleaning', image_url: "https://spencerheywood.com/images/servo/Pictures/ease_photoshoot_2/E22A3554.jpg", icon_image_url: "http://spencerheywood.com/images/dash_door/the-cheesecake-factory-logo.avif"},
    { name: "Jdog Carpet Cleaning", image_url: "https://spencerheywood.com/images/servo/highlights/Dry%20Wall%2C%20Pool%20House%2C%20Roofing-11.jpg", icon_image_url: "http://spencerheywood.com/images/dash_door/wendys-logo.avif"},
    { name: "Refresh Garbage Can Cleaning", image_url: "https://spencerheywood.com/images/servo/highlights/Servo%20Pictures-30.jpg", icon_image_url: "http://spencerheywood.com/images/dash_door/dunkin-logo.avif"},
    { name: 'Refresh Garbage Can Cleaning', image_url: "https://spencerheywood.com/images/servo/highlights/Servo%20Pictures-42.jpg", icon_image_url: "http://spencerheywood.com/images/dash_door/pizza-hut-logo.avif"},
    { name: 'Refresh Garbage Can Cleaning', image_url: "https://spencerheywood.com/images/servo/highlights/Servo%20Pictures-34.jpg", icon_image_url: "http://spencerheywood.com/images/dash_door/panda-logo.avif"},
    { name: 'Dead Aim Pest Control', image_url: "https://spencerheywood.com/images/servo/highlights/Servo%20Pictures-1.jpg", icon_image_url: "http://spencerheywood.com/images/dash_door/subway-logo.avif"},
    { name: 'Dead Aim Pest Control', image_url: "https://spencerheywood.com/images/servo/Pictures/Highlights/Servo%20Pictures-6.jpg", icon_image_url: "http://spencerheywood.com/images/dash_door/papa-johns-logo.avif"},
    { name: 'Lily Maid House Cleaning', image_url: "https://spencerheywood.com/images/servo/highlights/Lily%20Maid%20Cleaning%20Shoot-49.jpg", icon_image_url: "http://spencerheywood.com/images/dash_door/popeyes-logo.avif"},
    { name: 'Lily Maid House Cleaning', image_url: "https://spencerheywood.com/images/servo/Pictures/lily_maid_cleaning/Lily%20Maid%20Cleaning%20Shoot-50.jpg", icon_image_url: "http://spencerheywood.com/images/dash_door/sonic-logo.avif"},
    { name: 'Onsite Detail', image_url: "https://spencerheywood.com/images/servo/highlights/52-09282019_OnsiteDetail052.jpg", icon_image_url: "http://spencerheywood.com/images/dash_door/taco-bell-logo.avif"},
    { name: "Onsite Detail", image_url: "https://spencerheywood.com/images/servo/Pictures/onsite_detail/11-09282019_OnsiteDetail011.jpg", icon_image_url: "http://spencerheywood.com/images/dash_door/mcdonalds-logo.avif"}, 
])

puts "Creating demo user"

user = User.create([
    { first_name: 'Demo', last_name: 'User', email: 'demo@dashdoor.com', password: 'password',phone_number: '1002003000'},
    { first_name: 'Joe', last_name: 'Burrows', email: 'joe@dashdoor.com', password: 'password',phone_number: '1002003001'},
    { first_name: 'Demi', last_name: 'Levato', email: 'demi@dashdoor.com', password: 'password',phone_number: '1002003002'},
    { first_name: 'Bob', last_name: 'Saget', email: 'bob@dashdoor.com', password: 'password',phone_number: '1002003003'},
    { first_name: 'Mary', last_name: 'Jane', email: 'mary@dashdoor.com', password: 'password',phone_number: '1002003004'},
    { first_name: 'Donald', last_name: 'Trump', email: 'donald@dashdoor.com', password: 'password',phone_number: '1002003005'}
])

puts "Creating menu items"

menu_item = MenuItem.create([
    {name: 'Caffe Latte', price: '4.75', restaurant_id: 1, image_url: "http://spencerheywood.com/images/dash_door/starbucks-caffe-latte.avif"},
    {name: 'Impossible Breakfast Sandwich', price: '6.95', restaurant_id: 1, image_url: "http://spencerheywood.com/images/dash_door/starbucks-impossible-breakfast-sandwich.avif"},
    {name: 'Sausage, Cheddar & Egg Sandwich', price: '5.45', restaurant_id: 1, image_url: "http://spencerheywood.com/images/dash_door/starbucks-sausage-cheddar-egg-sandwich.avif"},
    {name: 'Spinach, Feta & Egg-white Wrap', price: '5.95', restaurant_id: 1, image_url: "http://spencerheywood.com/images/dash_door/starbucks-spinach-feta-egg-white-wrap.avif"},
    {name: 'Walnut & Pecan Loaf', price: '4.75', restaurant_id: 1, image_url: "http://spencerheywood.com/images/dash_door/starbucks-walnut-becan-loaf.avif"},
    {name: 'Cappuccino', price: '4.75', restaurant_id: 1, image_url: "http://spencerheywood.com/images/dash_door/starbucks-cappuccino.avif"},

    {name: 'Chicken Quesadilla', price: '6.58', restaurant_id: 2, image_url: "http://spencerheywood.com/images/dash_door/taco-bell-chicken-quesadilla.avif"},
    {name: 'Crunchwrap Supreme', price: '6.58', restaurant_id: 2, image_url: "http://spencerheywood.com/images/dash_door/taco-bell-crunchwrap-supreme.avif"},
    {name: '2 Chicken Chalupas Supreme Combo', price: '14.63', restaurant_id: 2, image_url: "http://spencerheywood.com/images/dash_door/taco-bell-2-chicken-chalupas-supreme-combo.avif"},
    {name: 'Nachos BellGrande', price: '7.19', restaurant_id: 2, image_url: "http://spencerheywood.com/images/dash_door/taco-bell-nachos-bellgrande.avif"},
    {name: '3 Doritos Locos Tacos Supreme', price: '13.41', restaurant_id: 2, image_url: "http://spencerheywood.com/images/dash_door/taco-bell-3-doritos-locos-tacos-supreme.avif"},
    {name: 'Nacho Cheese Doritos Locos Tacos', price: '3.53', restaurant_id: 2, image_url: "http://spencerheywood.com/images/dash_door/taco-bell-nach-cheese-doritos-locos-tacos.avif"},
    
    {name: 'Oven-Roasted Turkey', price: '8.83', restaurant_id: 3, image_url: "http://spencerheywood.com/images/dash_door/subway-oven-roasted-turkey.avif"},
    {name: 'Tuna', price: '8.83', restaurant_id: 3, image_url: "http://spencerheywood.com/images/dash_door/subway-tuna.avif"},
    {name: 'Sweet Onion Chicken Teriyaki', price: '9.90', restaurant_id: 3, image_url: "http://spencerheywood.com/images/dash_door/subway-sweet-onion-chicken-teriyaki.avif"},
    {name: 'Coca-Cola Classic', price: '3.64', restaurant_id: 3, image_url: "http://spencerheywood.com/images/dash_door/subway-coca-cola-classic.avif"},
    {name: 'Meatball Marinara', price: '8.48', restaurant_id: 3, image_url: "http://spencerheywood.com/images/dash_door/subway-meatball-marinara.avif"},
    {name: 'spicy-italian', price: '9.42', restaurant_id: 3, image_url: "http://spencerheywood.com/images/dash_door/subway-spicy-italian.avif"},
    
    {name: '10 PC. Crispy Chicken Nuggets', price: '5.49', restaurant_id: 4, image_url: "http://spencerheywood.com/images/dash_door/wendys-10pc-crispy-chicken-nuggets.avif"},
    {name: '6 PC. Crispy Chicken Nuggets', price: '3.36', restaurant_id: 4, image_url: "http://spencerheywood.com/images/dash_door/wendys-6pc-crispy-chicken-nuggets.avif"},
    {name: '10 PC. Spicy Chicken Nuggets', price: '5.49', restaurant_id: 4, image_url: "http://spencerheywood.com/images/dash_door/wendys-10pc-spicy-chicken-nuggets.avif"},
    {name: 'Baconator Combo', price: '12.11', restaurant_id: 4, image_url: "http://spencerheywood.com/images/dash_door/wendys-baconator-combo.avif"},
    {name: '10 PC. Nuggets Combo', price: '12.11', restaurant_id: 4, image_url: "http://spencerheywood.com/images/dash_door/wendys-10pc-nuggets-combo.avif"},
    {name: 'Jr. Bacon Cheeseburger', price: '3.74', restaurant_id: 4, image_url: "http://spencerheywood.com/images/dash_door/wendy-jr-bacon-cheeseburger.avif"},
    {name: 'Spicy Chicken Sandwich Combo', price: '13.11', restaurant_id: 4, image_url: "http://spencerheywood.com/images/dash_door/wendys-spicy-chicken-sandwich-combo.avif"},
    
    {name: 'Cajun Fries', price: '4.95', restaurant_id: 5, image_url: "http://spencerheywood.com/images/dash_door/popeyes-cajun-fries.avif"},
    {name: '5Pc Handcrafted Tenders Combo', price: '18.94', restaurant_id: 5, image_url: "http://spencerheywood.com/images/dash_door/popeyes-5pc-handcrafted-tenders-combo.avif"},
    {name: '4Pc Signature Chicken Combo', price: '18.79', restaurant_id: 5, image_url: "http://spencerheywood.com/images/dash_door/popeyes-4pc-signature-chicken-combo.avif"},
    {name: 'Homestyle Mac & Cheese', price: '5.09', restaurant_id: 5, image_url: "http://spencerheywood.com/images/dash_door/popeyes-homestyle-mac-and-cheese.avif"},
    {name: 'Spicy Chicken Sandwich', price: '5.99', restaurant_id: 5, image_url: "http://spencerheywood.com/images/dash_door/popeyes-spicy-chicken-sandwich.avif"},
    {name: '12pc Wings', price: '14.79', restaurant_id: 5, image_url: "http://spencerheywood.com/images/dash_door/popeyes-12pc-wings.avif"},
    
    {name: 'Bacon Egg And Cheese', price: '4.73', restaurant_id: 6, image_url: "http://spencerheywood.com/images/dash_door/dunkin-bacon-egg-and-cheese.avif"},
    {name: 'Bagel With Cream Cheese Spread', price: '6.86', restaurant_id: 6, image_url: "http://spencerheywood.com/images/dash_door/dunkin-bagel-with-cream-cheese-spread.avif"},
    {name: 'Half Dozen Donuts', price: '12.48', restaurant_id: 6, image_url: "http://spencerheywood.com/images/dash_door/dunkin-half-dozen-donuts.avif"},
    {name: 'Original Blend Iced Coffee', price: '4.36', restaurant_id: 6, image_url: "http://spencerheywood.com/images/dash_door/dunkin-original-blend-iced-coffee.avif"},
    {name: 'Original Blend', price: '2.98', restaurant_id: 6, image_url: "http://spencerheywood.com/images/dash_door/dunkin-original-blend.avif"},
    {name: 'Sausage Egg And Cheese', price: '6.86', restaurant_id: 6, image_url: "http://spencerheywood.com/images/dash_door/dunkin-sausage-egg-and-cheese.avif"},
    
    {name: 'Buffalo Wings', price: '8.49', restaurant_id: 7, image_url: "http://spencerheywood.com/images/dash_door/papa-johns-buffalo-wings.avif"},
    {name: 'Cheese Pizza', price: '11.00', restaurant_id: 7, image_url: "http://spencerheywood.com/images/dash_door/papa-johns-cheese-pizza.avif"},
    {name: 'Garden Fresh Pizza', price: '13.99', restaurant_id: 7, image_url: "http://spencerheywood.com/images/dash_door/papa-johns-garden-fresh-pizza.avif"},
    {name: 'Pepperoni Pizza', price: '11.00', restaurant_id: 7, image_url: "http://spencerheywood.com/images/dash_door/papa-johns-pepperoni-pizza.avif"},
    {name: 'Pepsi', price: '2.49', restaurant_id: 7, image_url: "http://spencerheywood.com/images/dash_door/papa-johns-pepsi.avif"},
    {name: 'Super Hawaiian Pizza', price: '13.99', restaurant_id: 7, image_url: "http://spencerheywood.com/images/dash_door/papa-johns-super-hawaiian-pizza.avif"},
    {name: 'The Meats Pizza', price: '13.99', restaurant_id: 7, image_url: "http://spencerheywood.com/images/dash_door/papa-johns-the-meats-pizza.avif"},
    
    {name: '6" Personal Pan Pizza', price: '5.64', restaurant_id: 8, image_url: "http://spencerheywood.com/images/dash_door/pizza-hut-6\"-personal-pan-pizza.avif"},
    {name: '8 Boneless Wings', price: '10.97', restaurant_id: 8, image_url: "http://spencerheywood.com/images/dash_door/pizza-hut-8-boneless-wings.avif"},
    {name: '12" Medium Pizza', price: '15.24', restaurant_id: 8, image_url: "http://spencerheywood.com/images/dash_door/pizza-hut-12\"-medium-pizza.avif"},
    {name: '14" Large Pizza', price: '17.92', restaurant_id: 8, image_url: "http://spencerheywood.com/images/dash_door/pizza-hut-14\"-large-pizza.avif"},
    {name: 'Breadsticks', price: '8.16', restaurant_id: 8, image_url: "http://spencerheywood.com/images/dash_door/pizza-hut-breadsticks.avif"},
    {name: 'Cinnabon Mini Rolls', price: '8.16', restaurant_id: 8, image_url: "http://spencerheywood.com/images/dash_door/pizza-hut-cinnabon-mini-rolls.avif"},
    
    {name: 'Cheeseburger Spring Rolls', price: '12.95', restaurant_id: 9, image_url: "http://spencerheywood.com/images/dash_door/the-cheesecake-factory-cheeseburger-spring-rolls.avif"},
    {name: 'Chocolate Tower Truffle Cake', price: '11.50', restaurant_id: 9, image_url: "http://spencerheywood.com/images/dash_door/the-cheesecake-factory-chocolate-tower-truffle-cake.avif"},
    {name: 'Fresh Strawberry Cheesecake', price: '12.50', restaurant_id: 9, image_url: "http://spencerheywood.com/images/dash_door/the-cheesecake-factory-fresh-strawberry-cheesecake.avif"},
    {name: 'Godiva Chocolate Cheesecake', price: '11.50', restaurant_id: 9, image_url: "http://spencerheywood.com/images/dash_door/the-cheesecake-factory-godiva-chocolate-cheesecake.avif"},
    {name: 'Oreo Dream Extreme Cheesecake', price: '11.50', restaurant_id: 9, image_url: "http://spencerheywood.com/images/dash_door/the-cheesecake-factory-oreo-dream-extreme-cheesecake.avif"},
    {name: 'louisiana-chicken-pasta', price: '23.95', restaurant_id: 9, image_url: "http://spencerheywood.com/images/dash_door/the-cheesecake-factory-louisiana-chicken-pasta.avif"},
    
    {name: 'Plate', price: '11.85', restaurant_id: 10, image_url: "http://spencerheywood.com/images/dash_door/panda-plate.avif"},
    {name: 'Bowl', price: '9.95', restaurant_id: 10, image_url: "http://spencerheywood.com/images/dash_door/panda-bowl.avif"},
    {name: 'Bigger Plate', price: '12.95', restaurant_id: 10, image_url: "http://spencerheywood.com/images/dash_door/panda-bigger-plate.avif"},
    {name: 'Cream Cheese Rangoon', price: '4.65', restaurant_id: 10, image_url: "http://spencerheywood.com/images/dash_door/panda-cream-cheese-rangoon.avif"},
    {name: 'The Original Orange Chicken', price: '4.95', restaurant_id: 10, image_url: "http://spencerheywood.com/images/dash_door/panda-the-original-orange-chicken.avif"},
    {name: 'Family Meal', price: '43.75', restaurant_id: 10, image_url: "http://spencerheywood.com/images/dash_door/panda-family-meal.avif"},
    
    {name: 'quarter-pound-double-cheeseburger', price: '9.95', restaurant_id: 11, image_url: "http://spencerheywood.com/images/dash_door/sonic-quarter-pound-double-cheeseburger.avif"},
    {name: 'hand-mixed-classic-shakes', price: '5.95', restaurant_id: 11, image_url: "http://spencerheywood.com/images/dash_door/sonic-hand-mixed-classic-shakes.avif"},
    {name: 'fries', price: '12.95', restaurant_id: 11, image_url: "http://spencerheywood.com/images/dash_door/sonic-fries.avif"},
    {name: 'mozzarella-sticks', price: '4.95', restaurant_id: 11, image_url: "http://spencerheywood.com/images/dash_door/sonic-mozzarella-sticks.avif"},
    {name: 'famous-slushes', price: '3.75', restaurant_id: 11, image_url: "http://spencerheywood.com/images/dash_door/sonic-famous-slushes.avif"},
    {name: 'tots', price: '4.95', restaurant_id: 11, image_url: "http://spencerheywood.com/images/dash_door/sonic-tots.avif"},
    
    {name: 'French Fries', price: '3.39', restaurant_id: 12, image_url: "http://spencerheywood.com/images/dash_door/mcdonalds-fries.avif"},
    {name: 'McChicken', price: '4.99', restaurant_id: 12, image_url: "http://spencerheywood.com/images/dash_door/mcdonalds-mcchicken.avif"},
    {name: '10 Piece McNuggets', price: '7.59', restaurant_id: 12, image_url: "http://spencerheywood.com/images/dash_door/mcdonalds-10pc-nuggets.avif"},
    {name: '2 Cheeseburger Meal', price: '10.99', restaurant_id: 12, image_url: "http://spencerheywood.com/images/dash_door/mcdonalds-2-cheeseburger-meal.avif"},
    {name: '10 Piece McNuggets Meal', price: '12.79', restaurant_id: 12, image_url: "http://spencerheywood.com/images/dash_door/mcdonalds-10-piece-mcnuggets-meal.avif"},
    {name: 'Big Mac Meal', price: '12.29', restaurant_id: 12, image_url: "http://spencerheywood.com/images/dash_door/mcdonalds-big-mac-meal.avif"},
])


puts "Creating reviews"

review = Review.create([
    {user_id: 3, restaurant_id: 1, score: 4, body: "Starbucks chili is always a comforting choice, but I wish their fries were consistently crispy. Overall, decent fast food."},
    {user_id: 2, restaurant_id: 1, score: 2, body: "I occasionally crave Starbucks burgers, but their service can be slow. Good value, but not my first pick."},
    {user_id: 4, restaurant_id: 1, score: 2, body: "Starbucks has lost its charm. Cold food, inaccurate orders, and lackluster service. Disappointed with the quality lately."},
    {user_id: 5, restaurant_id: 1, score: 5, body: "Starbucks spicy chicken nuggets are a true delight! Friendly staff and great food, always my fast-food favorite."},
    {user_id: 6, restaurant_id: 1, score: 1, body: "Terrible experience! Rude staff, wrong orders, and cold, greasy food. I won't be returning to this Starbucks location"},

    {user_id: 2, restaurant_id: 2, score: 2, body: "I used to be a big fan of Taco Bell, but the quality seems to have gone downhill recently. The last time I went, my order was messed up, and the food was lukewarm. The staff seemed rushed and didn't pay much attention to my request for extra sauce. It's a shame because I used to love their tacos."},
    {user_id: 5, restaurant_id: 2, score: 3, body: "I visit Taco Bell occasionally when I'm on the go, but I'm often left feeling underwhelmed. The prices are affordable, but the portion sizes have shrunk over time, and the taste is inconsistent. Sometimes the food is okay, but other times, it's just not worth the money."},
    {user_id: 4, restaurant_id: 2, score: 2, body: "Taco Bell is convenient, but the taste just doesn't cut it for me anymore. The ingredients feel cheap, and the flavors are mediocre at best. I've had better fast-food Mexican options elsewhere. Plus, the dining area was messy and unclean during my visit."},
    {user_id: 6, restaurant_id: 2, score: 3, body: "I have mixed feelings about Taco Bell. While they do offer some unique menu items, the quality varies greatly from one location to another. Some branches make the food with care, while others seem to rush through the process. It's hit or miss for me, and that's disappointing."},

    {user_id: 2, restaurant_id: 3, score: 4, body: "Subway is my go-to spot for a quick and customizable sandwich. I love the variety of ingredients and bread choices. The only drawback is that it can get a bit pricey if you add too many extras. Otherwise, a solid option for a quick meal"},
    {user_id: 3, restaurant_id: 3, score: 3, body: "Subway is convenient, but it's not my first choice for a sandwich. The quality of the ingredients is decent, but it doesn't always hit the spot for me. The sandwiches can be a bit bland, and I've had better options elsewhere."},
    {user_id: 4, restaurant_id: 3, score: 2, body: "I used to be a fan of Subway, but lately, I've been disappointed. The freshness of the ingredients seems to have declined, and the sandwiches are often soggy. Plus, the prices have gone up, making it less appealing."},
    {user_id: 6, restaurant_id: 3, score: 5, body: "I absolutely love Subway! The fresh veggies and variety of sauces make for delicious sandwiches every time. The service at my local Subway is top-notch, and I appreciate the healthy options they offer. Five stars all the way!"},
    {user_id: 5, restaurant_id: 3, score: 1, body: "Subway is a complete letdown. The last time I went there, my sandwich tasted like cardboard, and the service was incredibly slow. I can't believe I wasted my money on that. I won't be returning."},
   
    {user_id: 3, restaurant_id: 4, score: 4, body: "Wendy's chili is always a comforting choice, but I wish their fries were consistently crispy. Overall, decent fast food."},
    {user_id: 2, restaurant_id: 4, score: 2, body: "I occasionally crave Wendy's burgers, but their service can be slow. Good value, but not my first pick."},
    {user_id: 4, restaurant_id: 4, score: 2, body: "Wendy's has lost its charm. Cold food, inaccurate orders, and lackluster service. Disappointed with the quality lately."},
    {user_id: 5, restaurant_id: 4, score: 5, body: "Wendy's spicy chicken nuggets are a true delight! Friendly staff and great food, always my fast-food favorite."},
    {user_id: 6, restaurant_id: 4, score: 1, body: "Terrible experience! Rude staff, wrong orders, and cold, greasy food. I won't be returning to this Wendy's location"},
   
    {user_id: 2, restaurant_id: 5, score: 4, body: "Popeyes serves up some seriously tasty chicken. Love the crispy texture and bold flavors. Only downside: long wait times."},
    {user_id: 3, restaurant_id: 5, score: 4, body: "This food is good and tasty"},
    {user_id: 4, restaurant_id: 5, score: 5, body: "Popeyes is hands-down the best fast-food chicken joint! Flavor-packed, spicy tenders, and the biscuits are heavenly. Perfect."},
    {user_id: 5, restaurant_id: 5, score: 2, body: "lacked flavor. Not impressed."},
    {user_id: 6, restaurant_id: 5, score: 5, body: "Awful experience at Popeyes. Terrible service, cold food, and a messed-up order. Won't be returning anytime soon."},

    {user_id: 4, restaurant_id: 6, score: 4, body: "I frequent Dunkin' Donuts for their coffee, which is consistently good. Their donuts are a guilty pleasure, although I wish they offered more unique flavors. The service is usually quick and friendly. My only complaint is that the seating areas could be cleaner and more inviting."},
    {user_id: 3, restaurant_id: 6, score: 3, body: "Dunkin' Donuts has its ups and downs. I appreciate the convenience and the variety of coffee options, but the quality of their donuts has declined over the years. They used to be light and fluffy, but now they often taste stale. It's hit or miss. The breakfast sandwiches are decent, though."},
    {user_id: 2, restaurant_id: 6, score: 5, body: "Dunkin' Donuts is my morning savior. The coffee is consistently delicious, and their breakfast sandwiches, especially the bacon, egg, and cheese on a croissant, are mouthwatering. The service is usually efficient, and I love the cozy atmosphere of their stores. It's a go-to spot for a quick, satisfying breakfast."},
    {user_id: 6, restaurant_id: 6, score: 2, body: "This was somewhat disappointing. The staff were not very welcoming, and the food quality was mediocre at best. The only saving grace was the relatively clean seating area, but overall, not a great experience."},
    {user_id: 3, restaurant_id: 6, score: 2, body: "The service was slow, and the food was barely warm. The drive-thru speaker was also malfunctioning, which added to the frustration. It's not the worst, but there's a lot of room for improvement."},
    
    {user_id: 4, restaurant_id: 7, score: 4, body: "Papa John's consistently delivers a tasty pizza experience. Their crust is a highlight—crispy on the outside, soft on the inside. The toppings are generous, and the sauce has a nice tang. If they offered more unique topping options, I'd give them 5 stars"},
    {user_id: 3, restaurant_id: 7, score: 4, body: "I've been ordering from Papa John's for years, and I'm always satisfied with the quality. The pizza is consistently good, and the garlic dipping sauce is a game-changer. The only reason I'm not giving them 5 stars is that they could expand their menu with more side options."},
    {user_id: 2, restaurant_id: 7, score: 4, body: "Papa John's is my go-to for pizza delivery. Their online ordering system is user-friendly, and the pizzas arrive hot and delicious. The crust has a nice flavor, and the toppings are fresh. I appreciate the value for the quality, but a wider variety of vegetarian options would be a great addition."},
    {user_id: 5, restaurant_id: 7, score: 4, body: "I'm a fan of Papa John's pizza, especially their 'The Works' with all the toppings. The quality is reliable, and I like that they use better ingredients. The only drawback is that the delivery can sometimes take longer than expected, so order ahead of time."},
    {user_id: 6, restaurant_id: 7, score: 2, body: "Papa John's is a solid choice for pizza night. The crust is consistently good, and their 'Special Garlic' dipping sauce is addictive. The only reason I'm not giving them a perfect score is that I've had some minor issues with orders being delayed or incorrect, but they usually make it right."},
    {user_id: 3, restaurant_id: 7, score: 2, body: "The service was slow, and the food was barely warm. The drive-thru speaker was also malfunctioning, which added to the frustration. It's not the worst, but there's a lot of room for improvement."},
    
    {user_id: 4, restaurant_id: 8, score: 5, body: "Pizza Hut consistently exceeds my expectations. The pizzas are consistently delicious, and I love the variety of crust options and toppings. Their delivery is reliable, and the customer service is top-notch. Pizza Hut is my go-to for a perfect pizza night!"},
    {user_id: 3, restaurant_id: 8, score: 5, body: "I can't say enough good things about Pizza Hut. Their pizza is out of this world, especially the stuffed crust! The taste is always on point, and the orders are accurate and delivered with a smile. Pizza Hut sets the bar high for pizza perfection."},
    {user_id: 2, restaurant_id: 8, score: 5, body: "Pizza Hut never disappoints. The quality of their pizzas is consistently amazing. The cheese is gooey, the toppings are fresh, and the crust is perfection. The customer service is exceptional, making every dining experience enjoyable."},
    {user_id: 5, restaurant_id: 8, score: 5, body: "Pizza Hut is a pizza lover's paradise. Their 'Pan Pizza' is legendary, and I can't get enough of it. The menu variety ensures there's something for everyone. Whether dining in or ordering for delivery, Pizza Hut always delivers a 5-star experience."},
    {user_id: 6, restaurant_id: 8, score: 5, body: "I'm a lifelong fan of Pizza Hut. Their pizzas are consistently fantastic, and I appreciate the commitment to quality ingredients. The staff is friendly, and the dine-in experience is comfortable. Pizza Hut is, hands down, the best pizza chain around!"},
    {user_id: 3, restaurant_id: 8, score: 5, body: "Pizza Hut is a pizza paradise! Their pizza consistently hits the mark with flavorful toppings, gooey cheese, and the perfect crust. It's my family's favorite place for a pizza night. The online ordering and delivery service make it even better. Pizza Hut deserves all 5 stars!"},
    
    {user_id: 4, restaurant_id: 9, score: 5, body: "The Cheesecake Factory is a culinary masterpiece! Every dish I've tried is bursting with flavor, and their cheesecakes are heavenly. The extensive menu offers something for everyone. Service is impeccable. Worth every penny!"},
    {user_id: 3, restaurant_id: 9, score: 4, body: "The Cheesecake Factory offers a diverse menu with delicious options. Their cheesecakes are iconic, and the portion sizes are generous. The only drawback is that it can get quite busy, leading to longer wait times."},
    {user_id: 2, restaurant_id: 9, score: 3, body: "The Cheesecake Factory has a vast menu, but the quality can be hit or miss. Some dishes are great, while others fall short. The cheesecakes are the highlight, but the prices are steep for what you get."},
    {user_id: 5, restaurant_id: 9, score: 3, body: "I used to love The Cheesecake Factory, but recent visits have been disappointing. The menu is overwhelming, and the food feels mediocre for the price. The cheesecakes are the only saving grace."},
    {user_id: 6, restaurant_id: 9, score: 2, body: "The Cheesecake Factory is overrated and overpriced. The food was bland and overcooked, and the service was slow and inattentive. I won't be returning."},
    {user_id: 3, restaurant_id: 9, score: 5, body: "The Cheesecake Factory is a culinary delight! The menu is extensive, and everything I've tried has been fantastic. The cheesecakes are worth every calorie. The atmosphere is vibrant, and the service is top-notch. A 5-star experience!"},

    {user_id: 3, restaurant_id: 10, score: 4, body: "Panda Express chili is always a comforting choice, but I wish their fries were consistently crispy. Overall, decent fast food."},
    {user_id: 2, restaurant_id: 10, score: 2, body: "I occasionally crave Panda Express burgers, but their service can be slow. Good value, but not my first pick."},
    {user_id: 4, restaurant_id: 10, score: 2, body: "Panda Express has lost its charm. Cold food, inaccurate orders, and lackluster service. Disappointed with the quality lately."},
    {user_id: 5, restaurant_id: 10, score: 5, body: "Panda Express spicy chicken nuggets are a true delight! Friendly staff and great food, always my fast-food favorite."},
    {user_id: 6, restaurant_id: 10, score: 1, body: "Terrible experience! Rude staff, wrong orders, and cold, greasy food. I won't be returning to this Panda Express location"},

    {user_id: 3, restaurant_id: 11, score: 4, body: "Sonic chili is always a comforting choice, but I wish their fries were consistently crispy. Overall, decent fast food."},
    {user_id: 2, restaurant_id: 11, score: 2, body: "I occasionally crave Sonic burgers, but their service can be slow. Good value, but not my first pick."},
    {user_id: 4, restaurant_id: 11, score: 2, body: "Sonic has lost its charm. Cold food, inaccurate orders, and lackluster service. Disappointed with the quality lately."},
    {user_id: 5, restaurant_id: 11, score: 5, body: "Sonic spicy chicken nuggets are a true delight! Friendly staff and great food, always my fast-food favorite."},
    {user_id: 6, restaurant_id: 11, score: 1, body: "Terrible experience! Rude staff, wrong orders, and cold, greasy food. I won't be returning to this Sonic location"},

    {user_id: 4, restaurant_id: 12, score: 1, body: "Extremely disappointed with my last visit to McDonald's. The service was painfully slow, and my order was incorrect. The fries were cold and soggy, and the burger was overcooked. Definitely not the quality I expected."},
    {user_id: 6, restaurant_id: 12, score: 3, body: "This McDonald's was somewhat disappointing. The staff were not very welcoming, and the food quality was mediocre at best. The only saving grace was the relatively clean seating area, but overall, not a great experience."},
    {user_id: 3, restaurant_id: 12, score: 1, body: "Absolutely the worst McDonald's I've been to. The order took forever, and when it finally arrived, it was completely wrong. The burger was cold, and the staff seemed not to care at all about the mistake. Will not be returning."},
    {user_id: 2, restaurant_id: 12, score: 1, body: "This McDonald's visit was a letdown. The place was messy, the restroom was dirty, and there was a strong smell of stale oil. The food tasted as bad as the restaurant looked. Such a poor representation of the brand."},
    {user_id: 5, restaurant_id: 12, score: 1, body: "I'm appalled by the service at this McDonald's. The staff was rude, and the wait time was absurd for fast food. My coffee was spilled in the bag, and the fries were stale. It's a total failure in service and quality."},
    {user_id: 3, restaurant_id: 12, score: 2, body: "The service at this McDonald's was slow, and the food was barely warm. The drive-thru speaker was also malfunctioning, which added to the frustration. It's not the worst, but there's a lot of room for improvement."},
])

puts "Creating Addresses"

address = Address.create([
    {address: "1730 Pennsylvania Avenue NW, Washington, DC 20006", latitude: 38.898808067979665, longitude: -77.0403556322412, restaurant_id: 1},
    {address: "50 Massachusetts Ave NE, Washington, DC 20002", latitude: 38.90334726359773, longitude: -77.00480020327345, restaurant_id: 2},
    {address: "901 E St NW Suite 104, Washington, DC 20004", latitude: 38.90275499987932, longitude: -77.02368310867804, restaurant_id: 3},
    {address: "3900 Georgia Ave NW, Washington, DC 20011", latitude: 38.943563620493634, longitude:  -77.02539987810022, restaurant_id: 4},
    {address: "1322 14th St NW, Washington, DC 20005", latitude: 38.913859796747104, longitude: -77.03123652015837, restaurant_id: 5},
    {address: "1101 14th St NW Ste 102, Washington, DC 20005", latitude: 38.90258127078925, longitude: -77.03020670782361, restaurant_id: 6},
    {address: "313 H St NW, Washington, DC 20001", latitude: 38.907807481012746, longitude: -77.01694860450546, restaurant_id: 7},
    {address: "1501 A&B Maryland Ave NE, Washington, DC 20002", latitude: 38.90713986135493, longitude: -76.9792201390115, restaurant_id: 8},
    {address: "1426 H St NW, Washington, DC 20005", latitude: 38.90628046175839, longitude: -77.03380860725424, restaurant_id: 9},
    {address: "429 L'Enfant Plaza SW, Washington, DC 20024", latitude: 38.88992360655783, longitude:  -77.02591234052085, restaurant_id: 10},
    {address: "2205 W Patapsco Ave, Baltimore, MD 21230", latitude: 39.26682768252805, longitude: -76.65116402435393, restaurant_id: 11},
    {address: "2328 Georgia Ave NW, Washington, DC 20001", latitude: 38.93545426364675, longitude: -77.01545017678886, restaurant_id: 12}
])

puts "Done!"