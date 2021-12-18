package com.sbu.redistrictingserver.controller;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;


@RestController
@RequestMapping(path="/api/test")
public class FoodiesController {

    @Autowired
    private final Gson gson = new Gson();


    // 1. Find all the Chinese restaurants have 5 stars with over 50 reviews
    @GetMapping(path = "/query01")
    public ArrayList<String[]> getQuery01() throws SQLException {

        Connection connection  = null;
        connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/FoodiesPublicM3", "root", "asd123");
        String query = "SELECT DISTINCT Business.BusinessId, Business.Name "
            + "FROM Business "
            + "INNER JOIN Reviews ON Business.BusinessId = "
            + "Reviews.BusinessId "
            + "WHERE Business.Categories LIKE '%Chinese%' "
            + "AND Business.Stars > 3 "
            + "AND Business.ReviewCount > 10;";

        PreparedStatement selectStmt = null;
        selectStmt = connection.prepareStatement(query);
        ResultSet results = null;
        results = selectStmt.executeQuery();

        ArrayList<String[]> ans = new ArrayList<String[]>();
        while(results.next()) {
            String businessId = results.getString("BusinessId");
            String name = results.getString("Name");
            String[] temp = new String[2];
            temp[0] = businessId;
            temp[1] = name;
            ans.add(temp);
        }


        return ans;
    }

    //postQuery01
    @CrossOrigin
    @PostMapping(path="/postQuery01")
    public ArrayList<String[]> postQuery01 (@RequestBody String temp1) throws Exception {
        System.out.println(" origin data: " + temp1);

        String zipcode = temp1.substring(12, 17);
        System.out.println("zipcode:"+zipcode);
        String temp2 = temp1.substring(30, temp1.length()-1);
        JsonArray cons = gson.fromJson(temp2, JsonArray.class);
        System.out.println("size"+cons.size());

        String[] keywords = new String[cons.size()];
        for(int i = 0; i< cons.size(); i++){
            keywords[i] = cons.get(i).toString().substring(1, cons.get(i).toString().length()-1);
            System.out.println(keywords[i]);
        }

        Connection connection  = null;
        connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/FoodiesPublicM3", "root", "asd123");
//        String query = "SELECT * "
//            + "FROM Business "
//            + "where (";
//        for(int i = 0; i< cons.size(); i++){
//            query = query + "Categories LIKE '%" + keywords[i] + "%' ";
//            if(i != cons.size()-1){
//                query = query + " OR ";
//            }
//        }
//        query = query + ") "
//            + " AND PostalCode = '" + zipcode + "';";

        String query = "SELECT * "
            + "FROM Business "
            + "left join Reviews "
            + "on Business.BusinessId = Reviews.BusinessId "
            + "where (";
        for(int i = 0; i< cons.size(); i++){
            query = query + "Categories LIKE '%" + keywords[i] + "%' ";
            if(i != cons.size()-1){
                query = query + " OR ";
            }
        }
        query = query + ") "
            + " AND PostalCode = '" + zipcode + "' "
            + "group by Business.BusinessId "
            + "order by count(*) DESC; ";



        System.out.println("bug query: " + query);
        PreparedStatement selectStmt = null;
        selectStmt = connection.prepareStatement(query);
        ResultSet results = null;
        results = selectStmt.executeQuery();

        ArrayList<String[]> ans = new ArrayList<String[]>();
        while(results.next()) {
            String businessId = results.getString("BusinessId");
            String name = results.getString("Name");
            String address = results.getString("Address");
            String city = results.getString("City");
            String state = results.getString("State");
            String latitude = results.getString("Latitude");
            String longitude = results.getString("Longitude");
            String stars = results.getString("Stars");
            String reviewCount = results.getString("ReviewCount");
            String categories = results.getString("Categories");
            String[] temp = new String[10];
            temp[0] = businessId;
            temp[1] = name;
            temp[2] = address;
            temp[3] = city;
            temp[4] = state;
            temp[5] = latitude;
            temp[6] = longitude;
            temp[7] = stars;
            temp[8] = reviewCount;
            temp[9] = categories;
            ans.add(temp);
        }
        System.out.println(ans.size());

        return ans;
    }


    //postQuery02 get total number of stores of the zipcode
    @CrossOrigin
    @PostMapping(path="/postQuery02")
    public String postQuery02 (@RequestBody String temp1) throws Exception {
        System.out.println(" origin data: " + temp1);

        String zipcode = temp1.substring(12, 17);
        String temp2 = temp1.substring(30, temp1.length()-1);
        JsonArray cons = gson.fromJson(temp2, JsonArray.class);

        Connection connection  = null;
        connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/FoodiesPublicM3", "root", "asd123");
        String query = "SELECT Count(*) AS CC "
            + "FROM Business "
            + "WHERE PostalCode = '" + zipcode + "';";


        PreparedStatement selectStmt = null;
        selectStmt = connection.prepareStatement(query);
        ResultSet results = null;
        results = selectStmt.executeQuery();

        results.next();
        String totalNumber = results.getString("CC");

        return totalNumber;
    }


    //postQuery06
    @CrossOrigin
    @PostMapping(path="/postQuery06")
    public ArrayList<String[]> postQuery06 (@RequestBody String temp1) throws Exception {
        System.out.println(" origin data_6:  " + temp1);
        String businessId = temp1.substring(15, temp1.length()-2);
        System.out.println("zipcode:"+businessId);
        System.out.println("------");
        Connection connection  = null;
        connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/FoodiesPublicM3", "root", "asd123");
        // food
        String query = "SELECT Stars, Time, Text "
            + "From Reviews "
            + "WHERE Reviews.BusinessId = '" + businessId +"';";

        System.out.println(query);

        PreparedStatement selectStmt = null;
        selectStmt = connection.prepareStatement(query);
        ResultSet results = null;
        results = selectStmt.executeQuery();

        ArrayList<String[]> ans = new ArrayList<>();
        while(results.next()) {
            String[] temp = new String[3];
            temp[0] = results.getString("Stars");
            temp[1] = results.getString("Time");
            temp[2] = results.getString("Text");
            ans.add(temp);
        }
        System.out.println(ans.size());
        return ans;
    }


}



