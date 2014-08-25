<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Entry_model extends CI_Model {
    
    function __construct()
    {
        parent::__construct();
    }
    
    public function create_entry($date, $title, $content, $user_id)
    {
        $data = array(
            'creationDate' => $date ,
            'title' => $title,
            'content' => $content,
            'user_id' => $user_id
        );
        
        $this->db->insert('entries', $data); 
        $id = $this->db->insert_id();
        
        return (isset($id)) ? TRUE : FALSE;
    }

    public function update_entry($entry_id, array $data)
    {
        $this->db->where('id', $entry_id);
        return $this->db->update('entries', $data); 
    }

    public function get_entriesbyDate()
    {
        $query = $this->db->query("SELECT e.id, DATE(e.creationDate) creationDate, e.title, e.content, e.user_id, u.username "
                . "FROM entries e, users u "
                    . "WHERE (SELECT COUNT(*) "
                    . "FROM entries se "
                        . "WHERE e.user_id = se.user_id "
                        . "AND se.creationDate >= e.creationDate) <= 3 "
                    . "AND e.user_id = u.id "
                    . "ORDER BY creationDate DESC");
        
        return $query->result();
    }

    public function get_entriesByUserName($username)
    {
        $this->db->select('entries.id, DATE(entries.creationDate) creationDate, entries.title, entries.content, entries.user_id, users.username');
        $this->db->from('entries');
        $this->db->join('users', 'entries.user_id = users.id');
        $this->db->where('users.username', $username);
        $query = $this->db->get();
        return $query->result();
    }
}
