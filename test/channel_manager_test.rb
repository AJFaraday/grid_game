require 'minitest/autorun'
Dir["../lib/*.rb"].each {|file| require file }

module GridGame
  class ChannelManagerTest < Minitest::Test

    def test_get_configs
      manager = ChannelManager.new
      configs = manager.instance_variable_get(:@configs)
      assert_equal(
        {'players' => ['a', 'b', 'c']},
        configs['test']
      )
    end

    def test_join_channel
      manager = ChannelManager.new
      first_channel = manager.send(:get_channel, 'test')
      # first try, first player, waiting
      attrs = manager.join_channel('test')
      assert_equal('join', attrs[:action])
      assert_equal('a', attrs[:player])
      assert_equal('waiting', attrs[:status])
      assert_kind_of(EventMachine::Channel, attrs[:em_channel])
      # second try, second player, waiting
      attrs = manager.join_channel('test')
      assert_equal('join', attrs[:action])
      assert_equal('b', attrs[:player])
      assert_equal('waiting', attrs[:status])
      assert_kind_of(EventMachine::Channel, attrs[:em_channel])
      # third try, last player, start
      attrs = manager.join_channel('test')
      assert_equal('join', attrs[:action])
      assert_equal('c', attrs[:player])
      assert_equal('start', attrs[:status])
      assert_kind_of(EventMachine::Channel, attrs[:em_channel])
      # first try again
      attrs = manager.join_channel('test')
      assert_equal('join', attrs[:action])
      assert_equal('a', attrs[:player])
      assert_equal('waiting', attrs[:status])
      assert_kind_of(EventMachine::Channel, attrs[:em_channel])
      # Having filled it, a new channel has been initialized
      refute_equal(first_channel, manager.send(:get_channel, 'test'))
    end
    
  end
end
