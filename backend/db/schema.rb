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

ActiveRecord::Schema[7.0].define(version: 2024_01_02_201031) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "addresses", force: :cascade do |t|
    t.float "latitude"
    t.float "longitude"
    t.string "address"
    t.bigint "vendor_id"
    t.index ["vendor_id"], name: "index_addresses_on_vendor_id"
  end

  create_table "cart_items", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "menu_item_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["menu_item_id"], name: "index_cart_items_on_menu_item_id"
    t.index ["user_id"], name: "index_cart_items_on_user_id"
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

  create_table "menu_items", force: :cascade do |t|
    t.string "name", null: false
    t.float "price", null: false
    t.bigint "vendor_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "image_url"
    t.index ["vendor_id"], name: "index_menu_items_on_vendor_id"
  end

  create_table "order_details", force: :cascade do |t|
    t.bigint "order_id", null: false
    t.bigint "menu_item_id", null: false
    t.float "price", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["menu_item_id"], name: "index_order_details_on_menu_item_id"
    t.index ["order_id"], name: "index_order_details_on_order_id"
  end

  create_table "orders", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.float "total", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "order_details_id"
    t.bigint "vendor_id", null: false
    t.index ["order_details_id"], name: "index_orders_on_order_details_id"
    t.index ["user_id"], name: "index_orders_on_user_id"
    t.index ["vendor_id"], name: "index_orders_on_vendor_id"
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
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
  end

  create_table "vendors", force: :cascade do |t|
    t.string "name", null: false
    t.string "image_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "icon_image_url"
    t.string "category", null: false
    t.string "email", null: false
    t.string "phone_number", null: false
  end

  add_foreign_key "cart_items", "menu_items"
  add_foreign_key "cart_items", "users"
  add_foreign_key "images", "vendors"
  add_foreign_key "menu_items", "vendors"
  add_foreign_key "order_details", "menu_items"
  add_foreign_key "order_details", "orders"
  add_foreign_key "orders", "users"
  add_foreign_key "reviews", "users"
  add_foreign_key "reviews", "vendors"
end
