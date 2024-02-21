class AddImageUrlColumn < ActiveRecord::Migration[7.0]
  def change
    add_column :menu_items, :image_url, :string
    add_column :restaurants, :icon_image_url, :string
  end
end
