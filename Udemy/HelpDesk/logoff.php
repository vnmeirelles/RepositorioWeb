<?php
    session_start();
    session_destroy(); 
    header('Location: index.php')

    //unset -- permite remover um index especifico da sessão. 

    //session_destroy() -- remove a sessão, porém é preciso dar uma refresh na pagina

?>