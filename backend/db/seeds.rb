require "open-uri"

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

puts "Creating Vendors"

vendor = Vendor.create([
    { name: 'Ease Window Cleaning', phone_number: "9717771485", email:"easewindows@gmail.com", category:"window_cleaning", image_url: "https://spencerheywood.com/images/servo/highlights/E22A2993.jpg", icon_image_url: "https://spencerheywood.com/images/servo/logos_and_icons/Ease-Logo-A1%20%282%29%20%283%29%20copy%202.png"},
    { name: "Jdog Carpet Cleaning", phone_number: "9717771485", email:"jdog@gmail.com", category:"carpet_cleaning", image_url: "https://spencerheywood.com/images/servo/highlights/Dry%20Wall%2C%20Pool%20House%2C%20Roofing-11.jpg", icon_image_url: "https://spencerheywood.com/images/servo/logos_and_icons/logo237190-1594648885.jpeg"},
    { name: "Eco Refresh Garbage Can Cleaning", phone_number: "4356453890", email:"refreshgarbagecleaning@gmail.com", category:"garbage_can_cleaning", image_url: "https://spencerheywood.com/images/servo/highlights/Servo%20Pictures-30.jpg", icon_image_url: "https://spencerheywood.com/images/servo/logos_and_icons/refresh-ecowash-logo.png"},
    { name: 'Dead Aim Pest Control', phone_number: "4356453890", email:"deadaimpest@gmail.com", category:"pest_control", image_url: "https://spencerheywood.com/images/servo/highlights/Servo%20Pictures-1.jpg", icon_image_url: "https://spencerheywood.com/images/servo/logos_and_icons/Screen%20Shot%202021-06-21%20at%2010.19.09%20PM.png"},
    { name: 'Lily Maid House Cleaning', phone_number: "4356453890", email:"lilymaidhousecleaning@gmail.com", category:"house_cleaning", image_url: "https://spencerheywood.com/images/servo/Pictures/lily_maid_cleaning/Lily%20Maid%20Cleaning%20Shoot-50.jpg", icon_image_url: "https://spencerheywood.com/images/servo/logos_and_icons/lilymaid-logo.png"},
    { name: 'Onsite Detail', phone_number: "4356453890", email:"help@onsite.com", category:"car_detailing", image_url: "https://spencerheywood.com/images/servo/highlights/52-09282019_OnsiteDetail052.jpg", icon_image_url: "https://spencerheywood.com/images/servo/logos_and_icons/logo-dark%20copy%204.png"},
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

puts "Creating services"

service = Service.create([
    {name: 'Window Cleaning', price: '50', vendor_id: 1, formula:"((((1705600*#3)/(43658860+#3)+25.5)*#1)*#2)*#4"},
    {name: 'Carpet Cleaning', price: '115', vendor_id: 2},
    {name: 'Garbage Can Cleaning', price: '35', vendor_id: 3},
    {name: 'Pest Control', price: '40', vendor_id: 4},
    {name: 'House Cleaning', price: '35', vendor_id: 5, formula: "#3"},
    {name: 'Auto Detailing', price: '75', vendor_id: 6}
])

puts "Creating Inputs"

input = Input.create([
    {name:"Floors", input_type:"select", service_id: 1},
    {name:"What windows would you like cleaned?", input_type:"radio", service_id: 1},
    {name:"Total Square Footage", input_type:"range", service_id: 1},
    {name:"Additional Options", input_type:"checkbox", service_id: 1},
    {name:"Frequency", input_type:"radio", service_id: 1, recurring: true},
    {name:"Additional Options", input_type:"select", service_id: 1, recurring: true},
    # {name:"Floors", input_type:"select", service_id: 4},
    # {name:"Number of Cleaning Hours", input_type:"select", service_id: 5},
])

puts "Creating Options"

option = Option.create([
    {option_type:"select", name:"1", value:1.0, input_id:1},
    {option_type:"select", name:"2", value:1.2, input_id:1},
    {option_type:"select", name:"3", value:1.5, input_id:1},
    {option_type:"radio", name:"Inside/Out", value:1.5, input_id:2},
    {option_type:"radio", name:"Outside Only", value:1, input_id:2},
    {option_type:"min", value:1500, input_id:3},
    {option_type:"max", value:8000, input_id:3},
    {option_type:"step", value:250, input_id:3},
    {option_type:"default", value:2500, input_id:3},
    {option_type:"checkbox", name:"Screen Cleaning", value:1.28, input_id:4},
    {option_type:"radio", name:"Once a Year", value:1, input_id:5},
    {option_type:"radio", name:"Twice a Year", value:2, input_id:5},
    {option_type:"radio", name:"4 Times a Year", value:4, input_id:5},
    {option_type:"select", name:"Inside/Out", value:1, input_id:6},
    {option_type:"select", name:"Outside Only", value:2, input_id:6},
    {option_type:"select", name:"Alternating Inside and Out / Outside Only", value:3, input_id:6},
    # {option_type:"select", name:"1", value:0, input_id:2},
    # {option_type:"select", name:"2", value:15, input_id:2},
    # {option_type:"select", name:"3", value:30, input_id:2},
    # {option_type:"select", name:"1", value:35, input_id:3},
    # {option_type:"select", name:"2", value:70, input_id:3},
    # {option_type:"select", name:"3", value:105, input_id:3},
    # {option_type:"select", name:"4", value:140, input_id:3},
    # {option_type:"select", name:"5", value:175, input_id:3},
    # {option_type:"select", name:"6", value:210, input_id:3},
    # {option_type:"select", name:"7", value:245, input_id:3},
    # {option_type:"select", name:"8", value:280, input_id:3},
])

puts "Creating reviews"

review = Review.create([
    # Reviews for Ease Window Cleaning
    {user_id: 3, vendor_id: 1, score: 4, body: "Ease Window Cleaning left my windows spotless and let in so much light. I just wish they offered more frequent scheduling options. Overall, very professional."},
    {user_id: 2, vendor_id: 1, score: 2, body: "I like the clarity of my windows after a visit from Ease Window Cleaning, but they sometimes arrive later than scheduled. Reasonable rates, but I might look elsewhere next time."},
    {user_id: 4, vendor_id: 1, score: 2, body: "Recently, Ease Window Cleaning has been a letdown. The last few times, they missed spots, and the crew seemed rushed. Hoping for improvement."},
    {user_id: 5, vendor_id: 1, score: 5, body: "Fantastic job by Ease Window Cleaning! They were thorough and my windows have never looked cleaner. Great customer service, highly recommended."},
    {user_id: 6, vendor_id: 1, score: 1, body: "Unsatisfactory service from Ease Window Cleaning. The team was impolite, missed their appointment time, and left streaks. Not using them again."},

    # Reviews for Jdog Carpet Cleaning
    {user_id: 2, vendor_id: 2, score: 2, body: "Jdog Carpet Cleaning was once my go-to for fresh carpets, but the last service was subpar. The cleaning team missed spots and seemed to be in a hurry."},
    {user_id: 5, vendor_id: 2, score: 3, body: "I use Jdog Carpet Cleaning now and then, but the results vary. Sometimes my carpets look renewed, other times not so much. They are affordable, though."},
    {user_id: 4, vendor_id: 2, score: 2, body: "Jdog Carpet Cleaning is convenient, but the cleaning doesn't always live up to my expectations. Carpets are cleaner but not as fresh as I'd like."},

    # Reviews for Eco Refresh Garbage Can Cleaning
    {user_id: 2, vendor_id: 3, score: 4, body: "Eco Refresh does wonders for dirty bins. They come back smelling fresh, but the booking process could be smoother."},
    {user_id: 2, vendor_id: 3, score: 4, body: "Eco Refresh leaves my garbage bins spotless and smelling like new. It's a bit pricey, but worth it for the convenience and results."},
    {user_id: 3, vendor_id: 3, score: 3, body: "The cleanliness of my bins after Eco Refresh's visit is noticeable, but they could improve their scheduling flexibility."},
    {user_id: 4, vendor_id: 3, score: 2, body: "Eco Refresh's cleaning service was underwhelming. The bins were cleaner, but the lingering smell wasn't fully removed. Expected better."},
    {user_id: 5, vendor_id: 3, score: 5, body: "Eco Refresh does an exceptional job with garbage can cleaning. Their attention to detail is impressive, and my cans have never been cleaner."},
    {user_id: 6, vendor_id: 3, score: 1, body: "Had a poor experience with Eco Refresh. The crew was late, and the cleaning was superficial. Not worth the cost."},

    # Reviews for Dead Aim Pest Control
    {user_id: 4, vendor_id: 4, score: 4, body: "Dead Aim Pest Control tackled our ant problem efficiently. Very knowledgeable staff, but I wish they had more flexible scheduling."},

    # Reviews for Lily Maid House Cleaning
    {user_id: 5, vendor_id: 5, score: 5, body: "Lily Maid House Cleaning does an impeccable job. Every nook and cranny shines, and the cleaners are courteous and punctual."},

    # Reviews for Onsite Detail
    {user_id: 3, vendor_id: 6, score: 4, body: "Onsite Detail left my car looking brand new. Great attention to detail, although it took a bit longer than expected."},

])


puts "Creating Addresses"

address = Address.create([
    {address: "435 N 300 W St George, UT 84790", latitude: 38.898808067979665, longitude: -77.0403556322412, vendor_id: 1},
    {address: "436 N 300 W St George, UT 84770", latitude: 38.90334726359773, longitude: -77.00480020327345, vendor_id: 2},
    {address: "437 N 300 W St George, UT 84790", latitude: 38.90275499987932, longitude: -77.02368310867804, vendor_id: 3},
    {address: "438 N 300 W St George, UT 84770", latitude: 38.943563620493634, longitude:  -77.02539987810022, vendor_id: 4},
    {address: "4359 N 300 W St George, UT 84790", latitude: 38.913859796747104, longitude: -77.03123652015837, vendor_id: 5},
    {address: "43 N 300 W St George, UT 84770", latitude: 38.90258127078925, longitude: -77.03020670782361, vendor_id: 6},
    {address: "425 N 300 W St George, UT 84790", latitude: 38.907807481012746, longitude: -77.01694860450546, vendor_id: 7},
    {address: "564 N 300 W St George, UT 84770", latitude: 38.90713986135493, longitude: -76.9792201390115, vendor_id: 8},
    {address: "4351 N 300 W St George, UT 84790", latitude: 38.90628046175839, longitude: -77.03380860725424, vendor_id: 9},
    {address: "4352 N 300 W St George, UT 84770", latitude: 38.88992360655783, longitude:  -77.02591234052085, vendor_id: 10},
    {address: "4353 N 300 W St George, UT 84790", latitude: 39.26682768252805, longitude: -76.65116402435393, vendor_id: 11},
    {address: "4354 N 300 W St George, UT 84770", latitude: 38.93545426364675, longitude: -77.01545017678886, vendor_id: 12}
])

puts "creating images!"

images = Image.create([
    {url:"https://spencerheywood.com/images/servo/Pictures/ease_photoshoot_1/DSC_9928.jpg", alt:"ease window cleaner", vendor_id: 1,image_type: "gallery"},
    {url:"https://spencerheywood.com/images/servo/Pictures/ease_photoshoot_1/DSC_9955.jpg", alt:"three window cleaners cleaning windows", vendor_id: 1,image_type: "gallery"},
    {url:"https://spencerheywood.com/images/servo/Pictures/ease_photoshoot_1/DSC_9963.jpg", alt:"two window cleaners cleaning windows", vendor_id:1 ,image_type: "gallery"},
    {url:"https://spencerheywood.com/images/servo/Pictures/ease_photoshoot_1/DSC_9975.jpg", alt:"window cleaner on rooftop", vendor_id: 1,image_type: "gallery"},
    {url:"https://spencerheywood.com/images/servo/Pictures/ease_photoshoot_1/DSC_9985.jpg", alt:"window cleaning truck", vendor_id: 1,image_type: "gallery"},
    {url:"https://spencerheywood.com/images/servo/Pictures/ease_photoshoot_1/DSC_9982.jpg", alt:"window cleaner on metal roof with ladder", vendor_id: 1,image_type: "gallery"},
    {url:"https://spencerheywood.com/images/servo/Pictures/ease_photoshoot_1/E22A3531%20copy.jpg", alt:"detailed window track cleaning with towel", vendor_id: 1,image_type: "gallery"},
    {url:"https://spencerheywood.com/images/servo/Pictures/ease_photoshoot_1/DSC_9972.jpg", alt:"window cleaner wiping down window", vendor_id: 1,image_type: "gallery"},
    {url:"https://spencerheywood.com/images/servo/Pictures/ease_photoshoot_1/DSC_9901.jpg", alt:"window cleaner cleaning a window on a ladder", vendor_id: 1,image_type: "gallery"},
    {url:"https://spencerheywood.com/images/servo/Pictures/jdog_carpet_cleaning/Dry%20Wall%2C%20Pool%20House%2C%20Roofing-1.jpg", alt:"carpet cleaning truck", vendor_id: 2,image_type: "gallery"},
    {url:"https://spencerheywood.com/images/servo/Pictures/jdog_carpet_cleaning/Dry%20Wall%2C%20Pool%20House%2C%20Roofing-10.jpg", alt:"carpet cleaning nozzel", vendor_id: 2,image_type: "gallery"},
    {url:"https://spencerheywood.com/images/servo/Pictures/jdog_carpet_cleaning/Dry%20Wall%2C%20Pool%20House%2C%20Roofing-14.jpg", alt:"carpet cleaner cleaning carpets", vendor_id: 2,image_type: "gallery"},
    {url:"https://spencerheywood.com/images/servo/Pictures/jdog_carpet_cleaning/Dry%20Wall%2C%20Pool%20House%2C%20Roofing-3.jpg", alt:"carpet cleaner machine", vendor_id: 2,image_type: "gallery"},
    {url:"https://spencerheywood.com/images/servo/Pictures/jdog_carpet_cleaning/Dry%20Wall%2C%20Pool%20House%2C%20Roofing-15.jpg", alt:"carpet cleaner guage", vendor_id: 2,image_type: "gallery"},
    {url:"https://spencerheywood.com/images/servo/Pictures/garbage_can_cleaning/Servo%20Pictures-29.jpg", alt:"garbage can cleaner in action", vendor_id: 3,image_type: "gallery"},
    {url:"https://spencerheywood.com/images/servo/Pictures/garbage_can_cleaning/Servo%20Pictures-22.jpg", alt:"freshly cleaned garbage can", vendor_id: 3,image_type: "gallery"},
    {url:"https://spencerheywood.com/images/servo/Pictures/garbage_can_cleaning/Servo%20Pictures-38%20copyss.png", alt:"garbage cans being cleaned in truck", vendor_id: 3,image_type: "gallery"},
    {url:"https://spencerheywood.com/images/servo/Pictures/garbage_can_cleaning/Servo%20Pictures-34.jpg", alt:"two trash cans being cleaed", vendor_id: 3,image_type: "gallery"},
    {url:"https://spencerheywood.com/images/servo/Pictures/garbage_can_cleaning/Servo%20Pictures-43.jpg", alt:"garbage can being pressure washed", vendor_id: 3,image_type: "gallery"},
    {url:"https://spencerheywood.com/images/servo/Pictures/PEST%20%2B%20GARBAGE%20PICTURES/drive-download-20211114T015454Z-001/Servo%20Pictures-1.jpg", alt:"pest control truck", vendor_id: 4,image_type: "gallery"},
    {url:"https://spencerheywood.com/images/servo/Pictures/PEST%20%2B%20GARBAGE%20PICTURES/drive-download-20211114T015454Z-001/Servo%20Pictures-3.jpg", alt:"pest control technician spraying chemicals", vendor_id: 4,image_type: "gallery"},
    {url:"https://spencerheywood.com/images/servo/Pictures/PEST%20%2B%20GARBAGE%20PICTURES/drive-download-20211114T015454Z-001/Servo%20Pictures-7.jpg", alt:"close up of pest control technician spraying home", vendor_id: 4,image_type: "gallery"},
    {url:"https://spencerheywood.com/images/servo/Pictures/PEST%20%2B%20GARBAGE%20PICTURES/drive-download-20211114T015454Z-001/Servo%20Pictures-9.jpg", alt:"pest control technician loading up truck", vendor_id: 4,image_type: "gallery"},
    {url:"https://spencerheywood.com/images/servo/Pictures/lily_maid_cleaning_cropped/Lily%20Maid%20Cleaning%20Shoot-12.jpg", alt:"house cleaner cleaning bathroom sink", vendor_id: 5,image_type: "gallery"},
    {url:"https://spencerheywood.com/images/servo/Pictures/lily_maid_cleaning_cropped/Lily%20Maid%20Cleaning%20Shoot-13.jpg", alt:"close up shot of house cleaner cleaning bathroom sink", vendor_id: 5,image_type: "gallery"},
    {url:"https://spencerheywood.com/images/servo/Pictures/lily_maid_cleaning_cropped/Lily%20Maid%20Cleaning%20Shoot-14.jpg", alt:"house cleaner wiping down shower door", vendor_id: 5,image_type: "gallery"},
    {url:"https://spencerheywood.com/images/servo/Pictures/lily_maid_cleaning_cropped/Lily%20Maid%20Cleaning%20Shoot-11.jpg", alt:"house cleaner making bed", vendor_id: 5,image_type: "gallery"},
    {url:"https://spencerheywood.com/images/servo/Pictures/lily_maid_cleaning_cropped/Lily%20Maid%20Cleaning%20Shoot-18.jpg", alt:"two house cleaners cleaning a bathroom", vendor_id: 5,image_type: "gallery"},
    {url:"https://spencerheywood.com/images/servo/Pictures/lily_maid_cleaning_cropped/Lily%20Maid%20Cleaning%20Shoot-25.jpg", alt:"two house cleaners cleaning kitchen", vendor_id: 5,image_type: "gallery"},
    {url:"https://spencerheywood.com/images/servo/Pictures/lily_maid_cleaning_cropped/Lily%20Maid%20Cleaning%20Shoot-26.jpg", alt:"close up of house cleaner wiping down kitchen counter", vendor_id: 5,image_type: "gallery"},
    {url:"https://spencerheywood.com/images/servo/Pictures/lily_maid_cleaning_cropped/Lily%20Maid%20Cleaning%20Shoot-28.jpg", alt:"house cleaner dusting kitchen cabinents", vendor_id: 5,image_type: "gallery"},
    {url:"https://spencerheywood.com/images/servo/Pictures/onsite_detail_square/11-09282019_OnsiteDetail011.jpg", alt:"auto detailer buffing out truck", vendor_id: 6,image_type: "gallery"},
    {url:"https://spencerheywood.com/images/servo/Pictures/onsite_detail_square/167-09282019_OnsiteDetail0167.jpg", alt:"auto detailer cleaning inside the car", vendor_id: 6,image_type: "gallery"},
    {url:"https://spencerheywood.com/images/servo/Pictures/onsite_detail_square/196-09282019_OnsiteDetail0196.jpg", alt:"auto detailer outside of home", vendor_id: 6,image_type: "gallery"},
    {url:"https://spencerheywood.com/images/servo/Pictures/onsite_detail_square/52-09282019_OnsiteDetail052.jpg", alt:"auto detailer van", vendor_id: 6,image_type: "gallery"},
    {url:"https://spencerheywood.com/images/servo/Pictures/onsite_detail_square/60-09282019_OnsiteDetail060.jpg", alt:"auto detailer wiping down truck", vendor_id: 6,image_type: "gallery"}
])

puts "Done!"