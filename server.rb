require "sinatra"
require 'net/http'
require 'oauth'
require 'sinatra/flash'

require "sinatra/reloader" if development?
require "pry" if development? || test?

require_relative 'keys'

set :bind, '0.0.0.0'  # bind to all interfaces
set :public_folder, File.join(File.dirname(__FILE__), "public")


get "/" do
  @reader = OAuth::Consumer.new(GOODREADS_API_KEY,
    GOODREADS_OAUTH_SECRET,
    :site => 'https://www.goodreads.com')
  @request_token = @reader.get_request_token

  erb :home
end

get '/auth/goodreads/callback' do
  @access_token = params['oauth_token']
  binding.pry
  redirect '/'
end

get "/api/v1/:title" do
  uri = URI("https://www.goodreads.com/search/index.xml?key=#{GOODREADS_API_KEY}&q=#{params[:title]}")
  return Net::HTTP.get(uri)
end
