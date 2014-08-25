<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Welcome extends CI_Controller {
    
    function __construct()
    {
        parent::__construct();
        $this->load->model('Entry_model');
        $this->load->library('ion_auth');
    }
    
    public function index()
    {
        //Load the Sigle page app
        $this->load->view('blog');
    }
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */