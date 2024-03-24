require 'stripe'

class Api::OrdersController < ApplicationController
    before_action :require_logged_in, except: [:stripe_webhook]
    skip_before_action :verify_authenticity_token, only: [:stripe_webhook]

    def index
        @user = User.find(params[:user_id])
        @orders = Booking
                    .where("(status='paid' OR status='completed') AND user_id=?", @user.id)
                    .order(created_at: :desc)
                    .limit(10)
        render :index
    end

    def stripe_webhook
        endpoint_secret = ENV['STRIPE_ENDPOINT_SECRET']
        payload = request.body.read
        sig_header = request.env['HTTP_STRIPE_SIGNATURE']
        event = nil

        begin
            event = Stripe::Webhook.construct_event(
                payload, sig_header, endpoint_secret
            )
        rescue JSON::ParserError => e
            # Invalid payload
            head :bad_request
            return
        rescue Stripe::SignatureVerificationError => e
            # Invalid signature
            head :bad_request
            return
        end

        # Handle the event
        case event.type
        when 'payment_intent.succeeded'
            payment_intent = event.data.object
            booking = Booking.find(payment_intent[:metadata][:booking_id])
            
            if booking.update!(status: :paid)
                create_order(booking)
            end
        else
            puts "Unhandled event type: #{event.type}"
        end

        head :ok
    end

    private
    def create_order(booking)
        # Order.new(booking) // when building this remember to exclude the "id", and assign a forign key (booking_id) to the id of the incoming booking
        # if order.save! do
            @booking = booking
            VendorMailer.work_order(@booking).deliver_now
            UserMailer.order_confirmation(@booking).deliver_now
            AdminMailer.new_order(@booking).deliver_now

            # render :show
        # end
    end
end