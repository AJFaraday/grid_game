require 'json'
module GridGame

  class MessageHandler

    def win_action
      {action: 'win'}.to_json
    end

    def reload_action
      {action: 'reload'}.to_json
    end

    def leave_action(player)
      {
        action: 'leave',
        player: player
      }.to_json
    end

  end

end
