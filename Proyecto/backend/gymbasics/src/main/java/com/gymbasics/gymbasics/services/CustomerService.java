package com.gymbasics.gymbasics.services;

import com.gymbasics.gymbasics.entities.Customer;
import com.gymbasics.gymbasics.entities.User;
import com.gymbasics.gymbasics.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CustomerService implements ICustomerService {
    @Autowired
    private CustomerRepository repository;
    @Override
    public List<Customer> getAll(){
        return (List<Customer>) repository.findAll();
    }

    @Override
    public Customer getById(Long id) {
        return (Customer) repository.findById(id).get();
    }
    @Override
    public void remove(Long id){
        repository.deleteById(id);
    }
    @Override
    public void save(Customer customer){
        repository.save(customer);
    }

}
