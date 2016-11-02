require 'yaml'
#
# @configs (from config/game_configs.yml)
# {
#   'left_twix': {'players': ['red', 'green']}
# }
#
# @channels - an hash of GridGame::Channel, the key is the config name
#
# join_channel(name)
#
# - if channel not found, create with a config
# - else, grab that channel
#   assign a player
#   if all are assigned
#     return {status: 'start', player: 'green'}
#   else
#     return {status: 'watiing', player: 'red'}
#
module GridGame
  class ChannelManager

    def initialize
      @channels = {}
      @configs = get_configs
    end

    def join_channel(channel)
      {
        player: channel.next_player,
        status: (channel.full? ? 'start' : 'waiting'),
        em_channel: channel.event_machine_channel,
        action: 'join'
      }
    end

    def get_channel(name)
      channel = @channels[name]
      if channel.nil? or channel.full?
        channel = @channels[name] = Channel.new(@configs[name])
      end
      channel
    end

    private

    def get_configs
      file_path = File.join(File.dirname(__FILE__), '..', 'config', 'game_configs.yml')
      YAML.load_file(file_path)
    end

  end
end
