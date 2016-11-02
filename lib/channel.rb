require 'eventmachine'

#
# initialize with a config
#
# {
#   players: ['string', 'strong']
# }
#
# attrs
#
# * @config
# * @event_machine_channel
#
# methods
#
# * current_player
# * next_player
# * full?
#
module GridGame

  class Channel

    attr_reader(:event_machine_channel)

    def initialize(config)
      @config = config
      #@config['players'].shuffle!
      @event_machine_channel = EventMachine::Channel.new
    end

    def current_player
      @config['players'][@player_cursor || 0]
    end

    def reset_cursor
      #@config['players'].shuffle!
      @player_cursor = nil
    end

    def next_player
      if @player_cursor
        @player_cursor += 1
      else
        @player_cursor ||= 0
      end
      current_player
    end

    def full?
      @player_cursor && @player_cursor >= (@config['players'].count - 1)
    end

  end

end
