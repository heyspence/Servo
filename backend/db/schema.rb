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

ActiveRecord::Schema[7.0].define(version: 2023_12_20_212331) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "addresses", force: :cascade do |t|
    t.float "latitude"
    t.float "longitude"
    t.string "address"
    t.bigint "restaurant_id"
    t.index ["restaurant_id"], name: "index_addresses_on_restaurant_id"
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
    t.string "type"
    t.bigint "restaurants_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["restaurants_id"], name: "index_images_on_restaurants_id"
  end

  create_table "menu_items", force: :cascade do |t|
    t.string "name", null: false
    t.float "price", null: false
    t.bigint "restaurant_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "image_url"
    t.index ["restaurant_id"], name: "index_menu_items_on_restaurant_id"
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
    t.bigint "restaurant_id", null: false
    t.index ["order_details_id"], name: "index_orders_on_order_details_id"
    t.index ["restaurant_id"], name: "index_orders_on_restaurant_id"
    t.index ["user_id"], name: "index_orders_on_user_id"
  end

  create_table "restaurants", force: :cascade do |t|
    t.string "name", null: false
    t.string "image_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "icon_image_url"
    t.string "category", null: false
    t.string "email", null: false
    t.string "phone_number", null: false
  end

  create_table "reviews", force: :cascade do |t|
    t.float "score", null: false
    t.bigint "restaurant_id", null: false
    t.bigint "user_id", null: false
    t.string "body", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["restaurant_id"], name: "index_reviews_on_restaurant_id"
    t.index ["user_id", "restaurant_id"], name: "index_reviews_on_user_id_and_restaurant_id", unique: true
    t.index ["user_id"], name: "index_reviews_on_user_id"
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

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "cart_items", "menu_items"
  add_foreign_key "cart_items", "users"
  add_foreign_key "images", "restaurants", column: "restaurants_id"
  add_foreign_key "menu_items", "restaurants"
  add_foreign_key "order_details", "menu_items"
  add_foreign_key "order_details", "orders"
  add_foreign_key "orders", "users"
  add_foreign_key "reviews", "restaurants"
  add_foreign_key "reviews", "users"
end
