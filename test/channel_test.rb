require 'minitest/autorun'
Dir["../lib/*.rb"].each { |file| require file }

module GridGame

  class ChannelTest < Minitest::Test

    def get_channel
      @channel = GridGame::Channel.new(
        {'players' => ['a', 'b', 'c']}
      )
    end

    def test_current_player_and_next_player
      get_channel
      assert_equal(@channel.current_player, 'a')
      assert_equal(@channel.current_player, 'a')
      assert_equal(@channel.next_player, 'a')
      assert_equal(@channel.current_player, 'a')
      assert_equal(@channel.next_player, 'b')
      assert_equal(@channel.current_player, 'b')
      assert_equal(@channel.next_player, 'c')
      assert_equal(@channel.current_player, 'c')
      assert_nil(@channel.next_player)
      assert_nil(@channel.current_player)
    end

    def test_full?
      get_channel
      refute(@channel.full?)
      @channel.next_player
      refute(@channel.full?)
      @channel.next_player
      refute(@channel.full?)
      @channel.next_player
      assert(@channel.full?)
    end

  end

end
