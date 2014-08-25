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
    
    public function get_profile()
    {
    }
    
}


/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

