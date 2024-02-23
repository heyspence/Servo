# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2024_02_17_205420) do
    # These are extensions that must be enabled in order to support this database
    enable_extension "plpgsql"
  
    create_table "addresses", force: :cascade do |t|
      t.float "latitude"
      t.float "longitude"
      t.string "street_address", null: false
      t.string "addressable_type", null: false
      t.bigint "addressable_id", null: false
      t.boolean "default", default: false
      t.string "zip_code", default: "000000", null: false
      t.string "city", default: "St George", null: false
      t.string "state", default: "UT", null: false
      t.string "street_address_2"
      t.index ["addressable_type", "addressable_id"], name: "index_addresses_on_addressable"
    end
  
    create_table "bookings", force: :cascade do |t|
      t.bigint "user_id", null: false
      t.datetime "created_at", null: false
      t.datetime "updated_at", null: false
      t.json "options_snapshot", default: "{}"
      t.decimal "price", null: false
      t.bigint "address_id", null: false
      t.bigint "vendor_id", null: false
      t.string "status", default: "priced", null: false
      t.datetime "appointment_at"
      t.index ["appointment_at"], name: 'index_bookings_on_appointment_at'
      t.index ["address_id"], name: "index_bookings_on_address_id"
      t.index ["user_id"], name: "index_bookings_on_user_id"
      t.index ["vendor_id"], name: "index_bookings_on_vendor_id"
    end
  
    create_table "images", force: :cascade do |t|
      t.string "url", null: false
      t.string "alt", null: false
      t.string "image_type"
      t.bigint "vendor_id", null: false
      t.datetime "created_at", null: false
      t.datetime "updated_at", null: false
      t.index ["vendor_id"], name: "index_images_on_vendor_id"
    end
  
    create_table "pricing_inputs", force: :cascade do |t|
      t.string "input_type", null: false
      t.string "name", null: false
      t.datetime "created_at", null: false
      t.datetime "updated_at", null: false
      t.boolean "required", default: false
      t.boolean "recurring", default: false
      t.bigint "vendor_id", null: false
      t.index ["vendor_id"], name: "index_pricing_inputs_on_vendor_id"
    end
  
    create_table "input_options", force: :cascade do |t|
      t.string "option_type", null: false
      t.string "name"
      t.float "value", null: false
      t.bigint "pricing_input_id", null: false
      t.datetime "created_at", null: false
      t.datetime "updated_at", null: false
      t.index ["pricing_input_id"], name: "index_options_on_pricing_input_id"
    end
  
    create_table "user_inputs", force: :cascade do |t|
      t.bigint "pricing_input_id", null: false
      t.bigint "address_id", null: false
      t.bigint "input_option_id"
      t.string "value_text"
      t.float "value_numeric"
      t.boolean "value_boolean"
      t.datetime "created_at", null: false
      t.datetime "updated_at", null: false
      t.index ["pricing_input_id"], name: "index_user_inputs_on_pricing_input_id"
      t.index ["address_id"], name: "index_user_inputs_on_address_id"
      t.index ["input_option_id"], name: "index_user_inputs_on_input_option_id"
    end

    create_table "reviews", force: :cascade do |t|
      t.float "score", null: false
      t.bigint "vendor_id", null: false
      t.bigint "user_id", null: false
      t.string "body", null: false
      t.datetime "created_at", null: false
      t.datetime "updated_at", null: false
      t.index ["user_id", "vendor_id"], name: "index_reviews_on_user_id_and_vendor_id", unique: true
      t.index ["user_id"], name: "index_reviews_on_user_id"
      t.index ["vendor_id"], name: "index_reviews_on_vendor_id"
    end
  
    create_table "vendor_pricing_inputs", force: :cascade do |t|
      t.bigint "pricing_input_id", null: false
      t.bigint "vendor_id", null: false
      t.datetime "created_at", null: false
      t.datetime "updated_at", null: false
      t.index ["pricing_input_id"], name: "index_vendor_pricing_inputs_on_pricing_input_id"
      t.index ["vendor_id"], name: "index_vendor_pricing_inputs_on_vendor_id"
    end
  
    create_table "users", force: :cascade do |t|
      t.string "first_name", null: false
      t.string "last_name", null: false
      t.string "phone_number"
      t.string "email", null: false
      t.string "country"
      t.string "password_digest", null: false
      t.string "session_token", null: false
      t.datetime "created_at", null: false
      t.datetime "updated_at", null: false
      t.string "user_type", default: "user"
      t.bigint "vendor_id"
      t.index ["email"], name: "index_users_on_email", unique: true
      t.index ["session_token"], name: "index_users_on_session_token", unique: true
      t.index ["vendor_id"], name: "index_users_on_vendor_id"
    end
  
    create_table "vendor_calendars", force: :cascade do |t|
      t.bigint "vendor_id", null: false
      t.text "access_token"
      t.text "refresh_token"
      t.datetime "expires_at"
      t.datetime "created_at", null: false
      t.datetime "updated_at", null: false
      t.index ["vendor_id"], name: "index_vendor_calendars_on_vendor_id"
    end
  
    create_table "vendors", force: :cascade do |t|
      t.string "name", null: false
      t.string "thumbnail_image_url", null: false
      t.datetime "created_at", null: false
      t.datetime "updated_at", null: false
      t.string "logo_image_url"
      t.string "category", null: false
      t.string "email", null: false
      t.string "phone_number", null: false
      t.decimal "min_price", null: false
      t.string "service_name", null: false
      t.decimal "price_to_durration_rate", null: false
      t.string "pricing_formula", null: false
    end
  
    add_foreign_key "bookings", "addresses", column: "address_id"
    add_foreign_key "bookings", "users", column: "user_id"
    add_foreign_key "bookings", "vendors", column: "vendor_id"
    add_foreign_key "images", "vendors", column: "vendor_id"
    add_foreign_key "input_options", "pricing_inputs", column: "pricing_input_id"
    add_foreign_key "reviews", "users", column: "user_id"
    add_foreign_key "reviews", "vendors", column: "vendor_id"
    add_foreign_key "user_inputs", "pricing_inputs", column: "pricing_input_id"
    add_foreign_key "user_inputs", "addresses", column: "address_id"
    add_foreign_key "user_inputs", "input_options", column: "input_option_id", optional: true
    add_foreign_key "vendor_pricing_inputs", "pricing_inputs", column: "pricing_input_id"
    add_foreign_key "vendor_pricing_inputs", "vendors", column: "vendor_id"
    add_foreign_key "users", "vendors", column: "vendor_id", optional: true
    add_foreign_key "vendor_calendars", "vendors", column: "vendor_id"
  end
  