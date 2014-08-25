<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');


class Profile extends CI_Controller 
{
    
    function __construct()
    {
        parent::__construct();
        $this->load->model('Entry_model');
        $this->load->model('Tweet_model');
        $this->load->library('ion_auth');
        $this->load->library('form_validation');
        $this->form_validation->set_error_delimiters('', '');
    }
    
    public function get_profile($username)
    {
        $response = $this->ion_auth->profile($username);
        echo json_encode($response);
    }
    
    public function get_tweets($screen_name,$user_id)
    {
        $response = $this->Tweet_model->get_userTweets($screen_name);
        //var_dump($response);
        $twitterList = array();
        if($this->ion_auth->logged_in())
        {
            $data = array();
            if($this->isOwner($user_id))
            {
                foreach ($response as $value) {
                    //echo $value['id_str'];
                    if($this->Tweet_model->isHidden($value['id_str']))
                    {
                        $data = array(
                            'id_str'            => $value['id_str'],
                            'name'              => $value['name'],
                            'profile_image_url' => $value['profile_image_url'],
                            'text'              => $value['text'],
                            'hidden'            => true,
                            'isOwner'           => true
                        );
                    }
                    else
                    {
                        $data = array(
                            'id_str'            => $value['id_str'],
                            'name'              => $value['name'],
                            'profile_image_url' => $value['profile_image_url'],
                            'text'              => $value['text'],
                            'hidden'            => false,
                            'isOwner'           => true
                        );
                    }
                    array_push($twitterList, $data);   
                }
            }
            else
            {
                foreach ($response as $value) {
                    if($this->Tweet_model->isHidden($value['id_str']))
                    {
                        $data = array(
                            'id_str'            => $value['id_str'],
                            'name'              => $value['name'],
                            'profile_image_url' => $value['profile_image_url'],
                            'text'              => $value['text'],
                            'hidden'            => true,
                            'isOwner'           => false
                        );
                    }
                    else
                    {
                        $data = array(
                            'id_str'            => $value['id_str'],
                            'name'              => $value['name'],
                            'profile_image_url' => $value['profile_image_url'],
                            'text'              => $value['text'],
                            'hidden'            => false,
                            'isOwner'           => false
                        );
                    }
                    array_push($twitterList, $data);   
                } 
            }
            echo json_encode($twitterList);
        }
        
        //echo json_encode($twitterList);
    }
    
    public function hide()
    {
        $return = $this->Tweet_model->isHidden($this->input->post('title'),$this->input->post('title'));
        echo $return;
    }
    
    public function unhide()
    {
        $return = $this->Tweet_model->isHidden($this->input->post('title'),$this->input->post('title'));
        echo $return;
    }


    private function isOwner($user_id)
    {
        $user = $this->ion_auth->user()->row(); //Get Logged in user
        if($user->user_id == $user_id)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    
}


/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

