require "sinatra"
require 'net/http'

require "sinatra/reloader" if development?
require "pry" if development? || test?
require 'dotenv'

Dotenv.load

set :bind, '0.0.0.0'  # bind to all interfaces
set :public_folder, File.join(File.dirname(__FILE__), "public")

get "/" do
  erb :home
end

get "/api/v1/:title" do |title|
  uri = URI("https://www.goodreads.com/search/index.xml?key=#{ENV['GOODREADS_API_KEY']}&q=#{title}")
  return Net::HTTP.get(uri)
end
