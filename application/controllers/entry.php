<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Entry extends CI_Controller 
{
    
    function __construct()
    {
        parent::__construct();
        $this->load->model('Entry_model');
        $this->load->library('ion_auth');
        $this->load->library('form_validation');
        $this->form_validation->set_error_delimiters('', '');
    }
    
    public function get_entries()
    {
        $response = $this->Entry_model->get_entriesbyDate();
        //var_dump($response);
        if($this->ion_auth->logged_in())
        {
            $data = array();
            foreach ($response as $entry) 
            {
                if($this->isOwner($entry->user_id))
                {
                    
                    $entry = array(
                        'id'            =>$entry->id,
                        'creationDate'  =>$entry->creationDate,
                        'title'         =>$entry->title,
                        'content'       =>$entry->content,
                        'user_id'       =>$entry->user_id,
                        'username'      =>$entry->username,
                        'editable'      =>true
                    );
                    
                    array_push($data, $entry);
                }
                else
                {
                    
                    $entry = array(
                        'id'            =>$entry->id,
                        'creationDate'  =>$entry->creationDate,
                        'title'         =>$entry->title,
                        'content'       =>$entry->content,
                        'user_id'       =>$entry->user_id,
                        'username'      =>$entry->username,
                        'editable'      =>false
                    );
                    
                    array_push($data, $entry);
                  
                }
            }
            echo json_encode($data);
        }
        else
        {
            echo json_encode($response);
        }
            
    }
    
    public function get_user_entries($username)
    {
        $response = $this->Entry_model->get_entriesByUserName($username);
        //var_dump($response);
        if($this->ion_auth->logged_in())
        {
            $data = array();
            foreach ($response as $entry) 
            {
                if($this->isOwner($entry->user_id))
                {
                    
                    $entry = array(
                        'id'            =>$entry->id,
                        'creationDate'  =>$entry->creationDate,
                        'title'         =>$entry->title,
                        'content'       =>$entry->content,
                        'user_id'       =>$entry->user_id,
                        'username'      =>$entry->username,
                        'editable'      =>true
                    );
                    
                    array_push($data, $entry);
                }
                else
                {
                    
                    $entry = array(
                        'id'            =>$entry->id,
                        'creationDate'  =>$entry->creationDate,
                        'title'         =>$entry->title,
                        'content'       =>$entry->content,
                        'user_id'       =>$entry->user_id,
                        'username'      =>$entry->username,
                        'editable'      =>false
                    );
                    
                    array_push($data, $entry);
                  
                }
            }
            echo json_encode($data);
        }
        else
        {
            echo json_encode($response);
        }
            
    }
    
    public function save_entry()
    {
        $this->form_validation->set_rules('title', 'Title', 'required|max_length[100]');
        $this->form_validation->set_rules('content', 'Content', 'required|max_length[220]');
        
        if (!$this->ion_auth->logged_in())
        {
            $this->data['message'] = "User not logged in";
            echo json_encode($this->data);
        }
        else 
        {
            if ($this->form_validation->run() == true)
            {
                
                $fecha = new DateTime();
                $user = $this->ion_auth->user()->row(); //Get Logged in user
                if($this->Entry_model->create_entry($fecha->format('Y-m-d H:i:s'),$this->input->post('title'),$this->input->post('content'),$user->id))
                {
                    $this->data['succes'] = true;
                    $this->data['message'] = "Entry created!!";
                    echo json_encode($this->data);
                }
                else
                {
                    $this->data['succes'] = false;
                    $this->data['message'] = "Entry not created!!";
                    echo json_encode($this->data);
                }
                
            }
            else
            {
                //set the flash data error message if there is one
                $this->data['message'] = (validation_errors()) ? validation_errors() : $this->session->flashdata('message');
                $this->data['succes'] = false;
                echo json_encode($this->data);
            }
        }           
    }
    
    public function edit_entry()
    {
        
        $this->form_validation->set_rules('title', 'Title', 'required|max_length[100]');
        $this->form_validation->set_rules('content', 'Content', 'required|max_length[220]');
        
        
        if (!$this->ion_auth->logged_in())
        {
            $this->data['message'] = "User not logged in";
            echo json_encode($this->data);
        }
        else 
        {
            if ($this->form_validation->run() == true)
            {
                $data = array('id'  =>$this->input->post('id'),
                    'title'         =>$this->input->post('title'),
                    'content'       =>$this->input->post('content'));
                
                if($this->Entry_model->update_entry($data['id'],$data))
                {
                    $this->data['succes'] = true;
                    $this->data['message'] = "Entry updated!!";
                    echo json_encode($this->data);
                }
                else
                {
                    $this->data['succes'] = false;
                    $this->data['message'] = "Entry not updated!!";
                    echo json_encode($this->data);
                }
                
            }
            else
            {
                //set the flash data error message if there is one
                $this->data['message'] = (validation_errors()) ? validation_errors() : $this->session->flashdata('message');
                $this->data['succes'] = false;
                echo json_encode($this->data);
            }
        }           
    }

    private function isOwner($entry_userid)
    {
        $user = $this->ion_auth->user()->row(); //Get Logged in user
        if($user->user_id == $entry_userid)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
}

