require 'json'
module GridGame

  class MessageHandler

    # TODO get to the case where this is needed

    def left_action(player)
      {action: 'left', player: player}.to_json
    end

    def stop_action
      {action: 'stop'}.to_json
    end

  end

end
