<?php


class DbConnection extends DB
{
    public function __construct()
    {
        parent::__construct(DBImplementation, DBHost, DBName, DBUsername, DBPassword);
    }

}