require 'json'
module GridGame

  class MessageHandler

    def stop_action
      {action: 'stop'}.to_json
    end

  end

end
