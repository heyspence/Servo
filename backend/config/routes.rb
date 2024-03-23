Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  namespace :api, defaults: { format: :json } do
    resource :session, only: [:create, :destroy, :show]
    resources :users, only: [:create, :show]
    resources :events, only: [:index, :create]
    resources :addresses, only: [:create]
    resources :contact, only: [:create]
    resources :reminders, only: [:create, :destroy, :update]
    post 'auth/google/callback', to: 'authentication#google_callback'

    resources :bookings, only: [:create, :destroy, :show, :update] do
      patch '/create-order', on: :member, to: 'bookings#create_order'
    end

    resources :user, only: [:index] do
      resources :bookings, only: [:index] do
        delete :destroy_all, on: :collection
      end
      resources :orders, only: [:index]
    end

    resources :orders do 
      post '/create-payment-intent', on: :collection, to: 'orders#create_payment_intent'
    end

    resources :vendors, only: [:index, :show, :update] do
      resources :reviews, only: [:index, :create]
      resources :images, only: [:index]
      resources :vendor_calendars, only: [:index]
    end

    resources :vendor_calendars, on: :member, only: [:destroy]

    resources :services, only: [:show]
    resources :reviews, only: [:destroy, :show, :update]
  end
end
