<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
require_once(FCPATH.'/vendor/j7mbo/twitter-api-php/TwitterAPIExchange.php');

class Tweet_model extends CI_Model {
    
    function __construct()
    {
        parent::__construct();
    }
    
    public function get_userTweets($screen_name)
    {
        $settings = $this->config->item('twitter_oauth');

        $url = 'https://api.twitter.com/1.1/statuses/user_timeline.json';
        $getfield = '?screen_name='.$screen_name.'&count=10';
        $requestMethod = 'GET';

        $twitter = new TwitterAPIExchange($settings);
        $response = $twitter->setGetfield($getfield)
            ->buildOauth($url, $requestMethod)
            ->performRequest();

        return $response;
    }

    public function save_tweet($tweet_id, $user_id)
    {
        $data = array(
            'id' => $tweet_id ,
            'user_id' => $user_id 
        );
        
        $this->db->insert('hidden_tweets', $data);
        $id = $this->db->insert_id();
        
        return (isset($id)) ? TRUE : FALSE;
    }

    public function remove_tweet($tweet_id)
    {
        return $this->db->delete('hidden_tweets', array('id' => $tweet_id)); 
    }
        
}

