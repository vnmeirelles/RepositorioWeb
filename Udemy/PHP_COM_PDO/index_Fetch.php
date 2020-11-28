<?php

$dsn = 'mysql:host=localhost;dbname=php_com_pdo';
$usuario = 'root';
$senha = '';

try {
    $conexao = new PDO($dsn, $usuario, $senha);
    /*
        $query = '
            create table tb_usuarios(
                    id int not null primary key auto_increment,
                    nome varchar (50) not null,
                    email varchar(100) not null,
                    senha varchar(32) not null
                )
        ';
        $retorno = $conexao->exec($query); //retorno 0, pois nao estamos modificando registros

        echo $retorno;
        */
    // $query = '
    //             insert into tb_usuarios(
    //                 nome, email, senha 
    //             ) values (
    //                 "Jorge Sant Ana", "jorge@teste.com.br", "123456"
    //             )
    // ';

    // $conexao->exec($query);

    // $query = '
    //             insert into tb_usuarios(
    //                 nome, email, senha 
    //             ) values (
    //                 "Jamilton Damasceno", "jamilton@teste.com.br", "456789"
    //             )
    // ';
    // $conexao->exec($query);

    // $query = '
    //     insert into tb_usuarios(
    //         nome, email, senha 
    //     ) values (
    //         "Maria Silva", "maria@teste.com.br", "456123"
    //     )
    // ';
    // $conexao->exec($query);


    $query = '
        select * from tb_usuarios order by nome desc limit 1
    ';

    $stmt = $conexao->query($query); //PDO Statemet
    // $lista = $stmt->fetchAll(PDO::FETCH_ASSOC); //retorno associativo 
    // $lista = $stmt->fetchAll(PDO::FETCH_NUM); //retorno numérico 
    // $lista = $stmt->fetchAll(PDO::FETCH_BOTH); //retorno associativo e numérico 
    $usuario = $stmt->fetch(PDO::FETCH_OBJ); //retorno objeto 

    echo '<pre>';
        print_r($usuario);
    echo '</pre>';

    echo $usuario->nome; //para acessar o que vem o BD -  objetos
    // echo $usuario['nome']; //para acessar o que vem o BD -  arrays

} catch (PDOException $e) {
    // echo '<pre>';
    //     print_r($e);
    // echo '</pre>';

    echo 'Erro: ' . $e->getCode() . ' Mensagem: ' . $e->getMessage();
    //registrar o erro de alguma forma.
}
