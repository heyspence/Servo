Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  namespace :api, defaults: { format: :json } do
    resource :session, only: [:create, :destroy, :show]
    resources :users, only: [:create, :show, :update] do
      patch 'update_password', on: :member, to: 'users#update_password'
    end
    resources :events, only: [:index, :create]
    resources :addresses, only: [:create, :update]
    resources :contact, only: [:create]
    post 'auth/google/callback', to: 'authentication#google_callback'

    resources :bookings, only: [:create, :destroy, :show, :update]
    # resources :bookings, only: [:create, :destroy, :show, :update] do
    #   patch '/create-order', on: :member, to: 'bookings#create_order'
    # end

    resources :user, only: [:index] do
      resources :bookings, only: [:index]
      resources :orders, only: [:index]
    end

    resources :orders, only: [] do 
      post '/stripe_webhook', on: :collection, to: 'orders#stripe_webhook'
    end

    resources :payments do 
      post '/create-payment-intent', on: :collection, to: 'payments#create_payment_intent'
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
