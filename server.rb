require 'em-websocket'
require 'cgi'
require 'json'
Dir["./lib/*.rb"].each { |file| require file }

EventMachine.run do

  @channel_manager = GridGame::ChannelManager.new
  @message_handler = GridGame::MessageHandler.new

  EM::WebSocket.start(:host => "0.0.0.0", :port => 8080) do |ws|
    ws.onopen do |handshake|

      puts 'Opening connection'
      params = CGI::parse(handshake.query_string)
      if params['config']
        channel = @channel_manager.get_channel(params['config'][0])
        channel_attrs = @channel_manager.join_channel(channel)
        em_channel = channel_attrs.delete(:em_channel)
        player = channel_attrs[:player]
        socket_id = em_channel.subscribe { |msg| ws.send msg }

        puts channel_attrs.inspect
        em_channel.push(channel_attrs.to_json)

        ws.onmessage do |msg|
          puts msg
          puts channel.started
          em_channel.push("#{msg}")
        end

        ws.onclose do
          em_channel.unsubscribe(socket_id)
          if !channel.started
            puts 'resetting channel'
            channel.reset_cursor
            em_channel.push(@message_handler.reload_action)
          elsif em_channel.num_subscribers == 1
            em_channel.push(@message_handler.win_action)
          elsif em_channel.num_subscribers > 1
            em_channel.push(@message_handler.leave_action(player))
          end
        end
      end

    end

  end
end
