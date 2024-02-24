require "open-uri"

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

puts "Creating vendors"

vendor = Vendor.create([
    # 1 - Window Cleaning
    { name: 'Demo Window Cleaner', 
        phone_number: "9717771485", 
        email:"spencer@bookservo.com", 
        category:"window_cleaning",
        thumbnail_image_url: "https://spencerheywood.com/images/servo/highlights/E22A3074.jpg", 
        logo_image_url: "https://spencerheywood.com/images/servo/logos_and_icons/Ease-Logo-A1%20%282%29%20%283%29%20copy%202.png",
        min_price: 58, 
        pricing_formula:"(((1705600*#2)/(43658860+#2)+25.5)*#1)*#3",
        price_to_duration_rate: 60
    },
    #2 - Garbage Can Cleaning
    { name: "Demo Garbage Can Cleaning", 
        phone_number: "4356453890", 
        email:"spencer@bookservo.com", 
        category:"garbage_can_cleaning", 
        thumbnail_image_url: "https://spencerheywood.com/images/servo/highlights/Servo%20Pictures-30.jpg", 
        logo_image_url: "https://spencerheywood.com/images/servo/logos_and_icons/refresh-ecowash-logo.png",
        min_price: 35,
        pricing_formula:"(#5*35)+(#6*25)",
        price_to_duration_rate: 70
    },
    #3 - Pest Control
    { name: 'Demo Pest Control', 
        phone_number: "4356453890", 
        email:"spencer@bookservo.com", 
        category:"pest_control", 
        thumbnail_image_url: "https://spencerheywood.com/images/servo/Pictures/PEST%20%2B%20GARBAGE%20PICTURES/drive-download-20211114T015454Z-001/Servo%20Pictures-9.jpg", 
        logo_image_url: "https://spencerheywood.com/images/servo/logos_and_icons/Screen%20Shot%202021-06-21%20at%2010.19.09%20PM.png",
        min_price: 65, 
        pricing_formula:"(#2<1700?65:(#2<=3500?75:95))*#9",
        price_to_duration_rate: 60
    },
    #4 - House Cleaning
    { name: 'Demo House Cleaner', 
        phone_number: "4356453890", 
        email:"spencer@bookservo.com", 
        category:"house_cleaning", 
        thumbnail_image_url: "https://spencerheywood.com/images/servo/highlights/Lily%20Maid%20Cleaning%20Shoot-49.jpg", 
        logo_image_url: "https://spencerheywood.com/images/servo/logos_and_icons/lilymaid-logo.png",
        min_price: 35, 
        pricing_formula:"#8*35",
        price_to_duration_rate: 35
    },
])

puts "Creating demo users"

user = User.create([
    { first_name: 'Demo', last_name: 'User', email: 'demo@dashdoor.com', password: 'password',phone_number: '1002003000'},
    { first_name: 'Joe', last_name: 'Burrows', email: 'joe@dashdoor.com', password: 'password',phone_number: '1002003001'},
    { first_name: 'Demi', last_name: 'Levato', email: 'demi@dashdoor.com', password: 'password',phone_number: '1002003002'},
    { first_name: 'Bob', last_name: 'Saget', email: 'bob@dashdoor.com', password: 'password',phone_number: '1002003003'},
    { first_name: 'Mary', last_name: 'Jane', email: 'mary@dashdoor.com', password: 'password',phone_number: '1002003004'},
    { first_name: 'Donald', last_name: 'Trump', email: 'donald@dashdoor.com', password: 'password',phone_number: '1002003005'},
    { first_name: 'Demo', last_name: 'Vendor', email: 'demovendor1@dashdoor.com', password: 'password',phone_number: '1002003005', user_type:'vendor', vendor_id: 1},
    { first_name: 'Demo', last_name: 'Vendor', email: 'demovendor2@dashdoor.com', password: 'password',phone_number: '1002003005', user_type:'vendor', vendor_id: 2},
    { first_name: 'Demo', last_name: 'Vendor', email: 'demovendor3@dashdoor.com', password: 'password',phone_number: '1002003005', user_type:'vendor', vendor_id: 3},
    { first_name: 'Demo', last_name: 'Vendor', email: 'demovendor4@dashdoor.com', password: 'password',phone_number: '1002003005', user_type:'vendor', vendor_id: 4}
])

puts "Creating pricing inputs"

pricing_input = PricingInput.create([
    # Home Inputs
    {name:"Floors", input_type:"select", required: true, alias: "FLOOR_COUNT", category: "address"},
    {name:"Total Square Footage", input_type:"range", required: true, alias: "SQUARE_FOOTAGE", category: "address"},

    # Window Cleaning
    {name:"What windows would you like cleaned?", input_type:"radio", required: true, alias: "WINDOW_CLEANING_SCOPE", category: "window_cleaning"},
    {name:"Additional Options", input_type:"select", recurring: true, alias: "WINDOW_CLEANING_ALTERNATING_SCOPE", category: "window_cleaning"},

    # Garbage Can Cleaning
    {name:"Number of Garbage Cans", input_type:"range", required: true, alias: "NUM_GARBAGE_CANS", category: "garbage_can_cleaning"},
    {name:"Number of Recycling Bins", input_type:"range", required: true, alias: "NUM_RECYCLE_BINS", category: "garbage_can_cleaning"},
    {name:"Additional Options", input_type:"select", recurring: true, alias: "GARBAGE_CAN_ALTERNATING_SCOPE", category: "garbage_can_cleaning"},

    # House Cleaning
    {name:"Number of Cleaning Hours", input_type:"range", required: true, alias: "NUM_CLEANING_HOURS", category: "house_cleaning"},

    # Pest Control
    {name:"Additional Options", input_type:"radio", required: true, alias: "PEST_CONTROL_SCOPE", category: "pest_control"},

    # Recurring Frequency
    {name:"Frequency", input_type:"radio", recurring: true, alias: "FREQUENCY_WEEKLY", category: "recurring_frequency"},
    {name:"Frequency", input_type:"radio", recurring: true, alias: "FREQUENCY_MONTHLY", category: "recurring_frequency"},
    {name:"Frequency", input_type:"radio", recurring: true, alias: "FREQUENCY_EVERY_OTHER_MONTH", category: "recurring_frequency"},
    {name:"Frequency", input_type:"radio", recurring: true, alias: "FREQUENCY_QUARTERLY", category: "recurring_frequency"},
])

puts "Creating pricing input options"

pricing_input_options = PricingInputOption.create([
    # FLOOR_COUNT
    {option_type:"select", name:"1", value:1.0, pricing_input_id:1},
    {option_type:"select", name:"2", value:1.2, pricing_input_id:1, default: true},
    {option_type:"select", name:"3", value:1.5, pricing_input_id:1},
    # SQUARE_FOOTAGE
    {option_type:"min", value:1500, pricing_input_id:2},
    {option_type:"max", value:8000, pricing_input_id:2},
    {option_type:"step", value:250, pricing_input_id:2},
    {option_type:"default", value:2500, pricing_input_id:2},
    # WINDOW_CLEANING_SCOPE
    {option_type:"radio", name:"Inside/Out", value:1, pricing_input_id:3, default: true},
    {option_type:"radio", name:"Outside Only", value:0.7, pricing_input_id:3},
    # WINDOW_CLEANING_ALTERNATING_SCOPE
    {option_type:"select", name:"Inside/Out", value:1, pricing_input_id:4},
    {option_type:"select", name:"Outside Only", value:2, pricing_input_id:4},
    {option_type:"select", name:"Alternating Inside & Out / Outside Only", value:3, pricing_input_id:4},
    # NUM_GARBAGE_CANS
    {option_type:"min", value:"0", pricing_input_id:5},
    {option_type:"max", value:"4", pricing_input_id:5},
    {option_type:"step", value:"1", pricing_input_id:5},
    {option_type:"default", value:"1", pricing_input_id:5},
    # NUM_RECYCLE_BINS
    {option_type:"min", value:"0", pricing_input_id:6},
    {option_type:"max", value:"4", pricing_input_id:6},
    {option_type:"step", value:"1", pricing_input_id:6},
    {option_type:"default", value:"1", pricing_input_id:6},
    # GARBAGE_CAN_ALTERNATING_CLEANING_SCOPE
    {option_type:"select", name:"Clean All Cans Every Service", value:1, pricing_input_id:7, default: true},
    {option_type:"select", name:"Alternate Cleaning: Garbage, Then Recycling", value:2, pricing_input_id:7},
    {option_type:"select", name:"Hybrid Schedule: Garbage + Recycling, Then Garbage Only", value:3, pricing_input_id:7},
    # NUM_CLEANING_HOURS
    {option_type:"min", value:"0", pricing_input_id:8},
    {option_type:"max", value:"8", pricing_input_id:8},
    {option_type:"step", value:"1", pricing_input_id:8},
    {option_type:"default", value:"3", pricing_input_id:8},
    # PEST_CONTROL_SCOPE
    {option_type:"radio", name:"Inside/Out", value:1, pricing_input_id:9, default: true},
    {option_type:"radio", name:"Outside Only", value:0.7, pricing_input_id:9},
    # FREQUENCY_WEEKLY
    {option_type:"radio", name:"Every 2 Months", value:6, pricing_input_id:10},
    {option_type:"radio", name:"Monthly", value:12, pricing_input_id:10},
    {option_type:"radio", name:"Every 2 Weeks", value:26, pricing_input_id:10, default: true},
    {option_type:"radio", name:"Weekly", value:52, pricing_input_id:10},
    # FREQUENCY_MONTHLY
    {option_type:"radio", name:"Once a Year", value:1, pricing_input_id:11},
    {option_type:"radio", name:"Twice a Year", value:2, pricing_input_id:11},
    {option_type:"radio", name:"Quarterly", value:4, pricing_input_id:11, default: true},
    {option_type:"radio", name:"Monthly", value:12, pricing_input_id:11},
    # FREQUENCY_EVERY_OTHER_MONTH
    {option_type:"radio", name:"Once a Year", value:1, pricing_input_id:12},
    {option_type:"radio", name:"Twice a Year", value:2, pricing_input_id:12},
    {option_type:"radio", name:"Quarterly", value:4, pricing_input_id:12, default: true},
    {option_type:"radio", name:"Every 2 Months", value:6, pricing_input_id:12},
    # FREQUENCY_QUARTERLY
    {option_type:"radio", name:"Once a Year", value:1, pricing_input_id:13},
    {option_type:"radio", name:"Twice a Year", value:2, pricing_input_id:13, default: true},
    {option_type:"radio", name:"Quarterly", value:4, pricing_input_id:13},
])

puts 'Creating vendor_pricing_inputs joins table'

vendor_pricing_inputs = VendorPricingInput.create([
    #1 - Window Cleaning
    {pricing_input_id: 1, vendor_id: 1},
    {pricing_input_id: 2, vendor_id: 1},
    {pricing_input_id: 3, vendor_id: 1},
    {pricing_input_id: 4, vendor_id: 1},
    {pricing_input_id: 13, vendor_id: 1},

    #2 - Garbage Can Cleaning
    {pricing_input_id: 5, vendor_id: 2},
    {pricing_input_id: 6, vendor_id: 2},
    {pricing_input_id: 7, vendor_id: 2},
    {pricing_input_id: 13, vendor_id: 2},

    #3 - Pest Control
    {pricing_input_id: 2, vendor_id: 3},
    {pricing_input_id: 9, vendor_id: 3},
    {pricing_input_id: 12, vendor_id: 3},
    
    #4 - House Cleaning
    {pricing_input_id: 8, vendor_id: 4},
    {pricing_input_id: 10, vendor_id: 4},
])

puts "Creating reviews"

review = Review.create([
    # Reviews for Ease Window Cleaning
    {user_id: 3, vendor_id: 1, score: 4, body: "Ease Window Cleaning left my windows spotless and let in so much light. I just wish they offered more frequent scheduling options. Overall, very professional."},
    {user_id: 2, vendor_id: 1, score: 2, body: "I like the clarity of my windows after a visit from Ease Window Cleaning, but they sometimes arrive later than scheduled. Reasonable rates, but I might look elsewhere next time."},
    {user_id: 4, vendor_id: 1, score: 2, body: "Recently, Ease Window Cleaning has been a letdown. The last few times, they missed spots, and the crew seemed rushed. Hoping for improvement."},
    {user_id: 5, vendor_id: 1, score: 5, body: "Fantastic job by Ease Window Cleaning! They were thorough and my windows have never looked cleaner. Great customer service, highly recommended."},
    {user_id: 6, vendor_id: 1, score: 1, body: "Unsatisfactory service from Ease Window Cleaning. The team was impolite, missed their appointment time, and left streaks. Not using them again."},

    # Reviews for Eco Refresh Garbage Can Cleaning
    {user_id: 2, vendor_id: 2, score: 5, body: "Eco Refresh does wonders for dirty bins. They come back smelling fresh, but the booking process could be smoother."},
    {user_id: 2, vendor_id: 2, score: 4, body: "Eco Refresh leaves my garbage bins spotless and smelling like new. It's a bit pricey, but worth it for the convenience and results."},
    {user_id: 3, vendor_id: 2, score: 3, body: "The cleanliness of my bins after Eco Refresh's visit is noticeable, but they could improve their scheduling flexibility."},
    {user_id: 4, vendor_id: 2, score: 2, body: "Eco Refresh's cleaning service was underwhelming. The bins were cleaner, but the lingering smell wasn't fully removed. Expected better."},
    {user_id: 5, vendor_id: 2, score: 5, body: "Eco Refresh does an exceptional job with garbage can cleaning. Their attention to detail is impressive, and my cans have never been cleaner."},
    {user_id: 6, vendor_id: 2, score: 1, body: "Had a poor experience with Eco Refresh. The crew was late, and the cleaning was superficial. Not worth the cost."},

    # Reviews for Dead Aim Pest Control
    {user_id: 4, vendor_id: 3, score: 5, body: "Dead Aim Pest Control tackled our ant problem efficiently. Very knowledgeable staff, but I wish they had more flexible scheduling."},

    # Reviews for Lily Maid House Cleaning
    {user_id: 5, vendor_id: 4, score: 5, body: "Lily Maid House Cleaning does an impeccable job. Every nook and cranny shines, and the cleaners are courteous and punctual."},
]) 

puts "Creating addresses"

address = Address.create([
    {city: "St George", state: "UT", zip_code: "84770", street_address: "435 N 300 W", latitude: 38.898808067979665, longitude: -77.0403556322412, addressable_type: "Vendor", addressable_id: 1},
    {city: "St George", state: "UT", zip_code: "84770", street_address: "436 N 300 W", latitude: 38.90334726359773, longitude: -77.00480020327345, addressable_type: "Vendor", addressable_id: 2},
    {city: "St George", state: "UT", zip_code: "84770", street_address: "437 N 300 W", latitude: 38.90275499987932, longitude: -77.02368310867804, addressable_type: "Vendor", addressable_id: 3},
    {city: "St George", state: "UT", zip_code: "84770", street_address: "438 N 300 W", latitude: 38.943563620493634, longitude:  -77.02539987810022, addressable_type: "Vendor", addressable_id: 4},
    {city: "St George", state: "UT", zip_code: "84770", street_address: "4354 S 300 E", latitude: 38.93545426364675, longitude: -77.01545017678886, addressable_type: "User", addressable_id: 1, default: true},
    {city: "St George", state: "UT", zip_code: "84770", street_address: "4354 S 300 E", latitude: 38.93545426364675, longitude: -77.01545017678886, addressable_type: "User", addressable_id: 2, default: true},
    {city: "St George", state: "UT", zip_code: "84770", street_address: "4354 S 300 E", latitude: 38.93545426364675, longitude: -77.01545017678886, addressable_type: "User", addressable_id: 3, default: true},
    {city: "St George", state: "UT", zip_code: "84770", street_address: "4354 S 300 E", latitude: 38.93545426364675, longitude: -77.01545017678886, addressable_type: "User", addressable_id: 4, default: true},
    {city: "St George", state: "UT", zip_code: "84770", street_address: "4354 S 300 E", latitude: 38.93545426364675, longitude: -77.01545017678886, addressable_type: "User", addressable_id: 5, default: true},
    {city: "St George", state: "UT", zip_code: "84770", street_address: "4354 S 300 E", latitude: 38.93545426364675, longitude: -77.01545017678886, addressable_type: "User", addressable_id: 6, default: true}
])

puts "creating images!"

images = Image.create([
    # Window Cleaning
    {url:"https://spencerheywood.com/images/servo/Pictures/ease_photoshoot_1/DSC_9928.jpg", alt:"ease window cleaner", vendor_id: 1,image_type: "gallery"},
    {url:"https://spencerheywood.com/images/servo/Pictures/ease_photoshoot_1/DSC_9955.jpg", alt:"three window cleaners cleaning windows", vendor_id: 1,image_type: "gallery"},
    {url:"https://spencerheywood.com/images/servo/Pictures/ease_photoshoot_1/DSC_9963.jpg", alt:"two window cleaners cleaning windows", vendor_id:1 ,image_type: "gallery"},
    {url:"https://spencerheywood.com/images/servo/Pictures/ease_photoshoot_1/DSC_9975.jpg", alt:"window cleaner on rooftop", vendor_id: 1,image_type: "gallery"},
    {url:"https://spencerheywood.com/images/servo/Pictures/ease_photoshoot_1/DSC_9985.jpg", alt:"window cleaning truck", vendor_id: 1,image_type: "gallery"},
    {url:"https://spencerheywood.com/images/servo/Pictures/ease_photoshoot_1/DSC_9982.jpg", alt:"window cleaner on metal roof with ladder", vendor_id: 1,image_type: "gallery"},
    {url:"https://spencerheywood.com/images/servo/Pictures/ease_photoshoot_1/E22A3531%20copy.jpg", alt:"detailed window track cleaning with towel", vendor_id: 1,image_type: "gallery"},
    {url:"https://spencerheywood.com/images/servo/Pictures/ease_photoshoot_1/DSC_9972.jpg", alt:"window cleaner wiping down window", vendor_id: 1,image_type: "gallery"},
    {url:"https://spencerheywood.com/images/servo/Pictures/ease_photoshoot_1/DSC_9901.jpg", alt:"window cleaner cleaning a window on a ladder", vendor_id: 1,image_type: "gallery"},
    # Garbage Can Cleaning
    {url:"https://spencerheywood.com/images/servo/Pictures/garbage_can_cleaning/Servo%20Pictures-29.jpg", alt:"garbage can cleaner in action", vendor_id: 2,image_type: "gallery"},
    {url:"https://spencerheywood.com/images/servo/Pictures/garbage_can_cleaning/Servo%20Pictures-22.jpg", alt:"freshly cleaned garbage can", vendor_id: 2,image_type: "gallery"},
    {url:"https://spencerheywood.com/images/servo/Pictures/garbage_can_cleaning/Servo%20Pictures-38%20copyss.png", alt:"garbage cans being cleaned in truck", vendor_id: 2,image_type: "gallery"},
    {url:"https://spencerheywood.com/images/servo/Pictures/garbage_can_cleaning/Servo%20Pictures-34.jpg", alt:"two trash cans being cleaed", vendor_id: 2,image_type: "gallery"},
    {url:"https://spencerheywood.com/images/servo/Pictures/garbage_can_cleaning/Servo%20Pictures-43.jpg", alt:"garbage can being pressure washed", vendor_id: 2,image_type: "gallery"},
    # Pest Control
    {url:"https://spencerheywood.com/images/servo/Pictures/PEST%20%2B%20GARBAGE%20PICTURES/drive-download-20211114T015454Z-001/Servo%20Pictures-1.jpg", alt:"pest control truck", vendor_id: 3,image_type: "gallery"},
    {url:"https://spencerheywood.com/images/servo/Pictures/PEST%20%2B%20GARBAGE%20PICTURES/drive-download-20211114T015454Z-001/Servo%20Pictures-3.jpg", alt:"pest control technician spraying chemicals", vendor_id: 3,image_type: "gallery"},
    {url:"https://spencerheywood.com/images/servo/Pictures/PEST%20%2B%20GARBAGE%20PICTURES/drive-download-20211114T015454Z-001/Servo%20Pictures-7.jpg", alt:"close up of pest control technician spraying home", vendor_id: 3,image_type: "gallery"},
    {url:"https://spencerheywood.com/images/servo/Pictures/PEST%20%2B%20GARBAGE%20PICTURES/drive-download-20211114T015454Z-001/Servo%20Pictures-9.jpg", alt:"pest control technician loading up truck", vendor_id: 3,image_type: "gallery"},
    # House Cleaning
    {url:"https://spencerheywood.com/images/servo/Pictures/lily_maid_cleaning_cropped/Lily%20Maid%20Cleaning%20Shoot-12.jpg", alt:"house cleaner cleaning bathroom sink", vendor_id: 4,image_type: "gallery"},
    {url:"https://spencerheywood.com/images/servo/Pictures/lily_maid_cleaning_cropped/Lily%20Maid%20Cleaning%20Shoot-13.jpg", alt:"close up shot of house cleaner cleaning bathroom sink", vendor_id: 4,image_type: "gallery"},
    {url:"https://spencerheywood.com/images/servo/Pictures/lily_maid_cleaning_cropped/Lily%20Maid%20Cleaning%20Shoot-14.jpg", alt:"house cleaner wiping down shower door", vendor_id: 4,image_type: "gallery"},
    {url:"https://spencerheywood.com/images/servo/Pictures/lily_maid_cleaning_cropped/Lily%20Maid%20Cleaning%20Shoot-11.jpg", alt:"house cleaner making bed", vendor_id: 4,image_type: "gallery"},
    {url:"https://spencerheywood.com/images/servo/Pictures/lily_maid_cleaning_cropped/Lily%20Maid%20Cleaning%20Shoot-18.jpg", alt:"two house cleaners cleaning a bathroom", vendor_id: 4,image_type: "gallery"},
    {url:"https://spencerheywood.com/images/servo/Pictures/lily_maid_cleaning_cropped/Lily%20Maid%20Cleaning%20Shoot-25.jpg", alt:"two house cleaners cleaning kitchen", vendor_id: 4,image_type: "gallery"},
    {url:"https://spencerheywood.com/images/servo/Pictures/lily_maid_cleaning_cropped/Lily%20Maid%20Cleaning%20Shoot-26.jpg", alt:"close up of house cleaner wiping down kitchen counter", vendor_id: 4,image_type: "gallery"},
    {url:"https://spencerheywood.com/images/servo/Pictures/lily_maid_cleaning_cropped/Lily%20Maid%20Cleaning%20Shoot-28.jpg", alt:"house cleaner dusting kitchen cabinents", vendor_id: 4,image_type: "gallery"}
])

puts "Done!"