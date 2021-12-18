package com.sbu.redistrictingserver.controller;


import com.google.gson.Gson;
import com.google.gson.JsonArray;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path="/api/test")
public class ChartCalculateController {

  @Autowired
  private final Gson gson = new Gson();


  //postQuery03
  @CrossOrigin
  @PostMapping(path="/postQuery03")
  public ArrayList<Integer> postQuery03 (@RequestBody String temp1) throws Exception {
    System.out.println(" origin data: " + temp1);

    String zipcode = temp1.substring(12, 17);
    System.out.println("zipcode:"+zipcode);
    System.out.println("------");
    Connection connection  = null;
    connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/FoodiesPublicM3", "root", "asd123");
    // food
    String query = "SELECT Count(*) AS COUNT "
        + "FROM Business "
        + "where (Categories LIKE '%Restaurant%' OR  Categories LIKE '%Bars%' OR"
        + " Categories LIKE '%Coffee & TEA%' OR Categories LIKE '%Diners%' OR Categories LIKE '%Breakfast & Brunch%' "
        + "OR Categories LIKE '%Pizza%') "
        + " AND PostalCode = '" + zipcode + "';";

//        System.out.println(query);

    PreparedStatement selectStmt = null;
    selectStmt = connection.prepareStatement(query);
    ResultSet results = null;
    results = selectStmt.executeQuery();

    ArrayList<Integer> ans = new ArrayList<>();
    while(results.next()) {
      ans.add(results.getInt("COUNT"));
    }

    // Medical
    String query2 = "SELECT Count(*) AS COUNT "
        + "FROM Business "
        + "where (Categories LIKE '%Doctors%' OR  Categories LIKE '%Skin Care%' OR"
        + " Categories LIKE '%Health & Medica%' OR Categories LIKE '%Medical Centers%')"
        + " AND PostalCode = '" + zipcode + "';";

    selectStmt = null;
    selectStmt = connection.prepareStatement(query2);
    results = selectStmt.executeQuery();

    while(results.next()) {
      ans.add(results.getInt("COUNT"));
    }

    // Financial Service
    String query3 = "SELECT Count(*) AS COUNT "
        + "FROM Business "
        + "where (Categories LIKE '%Banks & Credit Unions%' OR  Categories LIKE '%Insurance%' OR"
        + " Categories LIKE '%Tax Services%' OR Categories LIKE '%Payroll Services%')"
        + " AND PostalCode = '" + zipcode + "';";

    selectStmt = null;
    selectStmt = connection.prepareStatement(query3);
    results = selectStmt.executeQuery();

    while(results.next()) {
      ans.add(results.getInt("COUNT"));
    }

    // Living
    String query4 = "SELECT Count(*) AS COUNT "
        + "FROM Business "
        + "where (Categories LIKE '%Home Services%' OR  Categories LIKE '%Real Estate%' OR"
        + " Categories LIKE '%Apartments%' OR Categories LIKE '%Community Centers%' OR Categories LIKE '%Community Centers%' OR Categories LIKE '%Community Centers%')"
        + " AND PostalCode = '" + zipcode + "';";

    selectStmt = null;
    selectStmt = connection.prepareStatement(query4);
    results = selectStmt.executeQuery();

    while(results.next()) {
      ans.add(results.getInt("COUNT"));
    }

    // Shopping
    String query5 = "SELECT Count(*) AS COUNT "
        + "FROM Business "
        + "where (Categories LIKE '%Toy Stores%' OR  Categories LIKE '%Electronics%' OR"
        + " Categories LIKE '%Fashion%' OR Categories LIKE '%Shoe Stores%' OR Categories LIKE '%Women''s Clothing%' OR Categories LIKE '%Tobacco Shops%' "
        + "OR Categories LIKE '%Wine & Spirits%')"
        + " AND PostalCode = '" + zipcode + "';";

    selectStmt = null;
    selectStmt = connection.prepareStatement(query5);
    results = selectStmt.executeQuery();

    while(results.next()) {
      ans.add(results.getInt("COUNT"));
    }

    // Others
    String query6 = "SELECT Count(*) AS COUNT "
        + "FROM Business "
        + "where (Categories LIKE '%Gas Stations%' OR  Categories LIKE '%Laundry Services%' OR"
        + " Categories LIKE '%Car Dealers%' OR Categories LIKE '%Auto Repair%' OR Categories LIKE '%Pet Services%')"
        + " AND PostalCode = '" + zipcode + "';";

    selectStmt = null;
    selectStmt = connection.prepareStatement(query6);
    results = selectStmt.executeQuery();

    while(results.next()) {
      ans.add(results.getInt("COUNT"));
    }
    System.out.println(ans.size());

    return ans;
  }



  //postQuery04
  @CrossOrigin
  @PostMapping(path="/postQuery04")
  public ArrayList<Integer> postQuery04 (@RequestBody String temp1) throws Exception {
    System.out.println(" origin data: " + temp1);

    String zipcode = temp1.substring(12, 17);
    System.out.println("zipcode:"+zipcode);
    System.out.println("------");
    Connection connection  = null;
    connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/FoodiesPublicM3", "root", "asd123");
    // food
    String query = "SELECT Count(*) AS COUNT "
        + "FROM Business "
        + "where (Categories LIKE '%Restaurant%' OR  Categories LIKE '%Bars%' OR"
        + " Categories LIKE '%Coffee & TEA%' OR Categories LIKE '%Diners%' OR Categories LIKE '%Breakfast & Brunch%' "
        + "OR Categories LIKE '%Pizza%'); ";

//        System.out.println(query);

    PreparedStatement selectStmt = null;
    selectStmt = connection.prepareStatement(query);
    ResultSet results = null;
    results = selectStmt.executeQuery();

    ArrayList<Integer> ans = new ArrayList<>();
    while(results.next()) {
      ans.add(results.getInt("COUNT"));
    }

    // Medical
    String query2 = "SELECT Count(*) AS COUNT "
        + "FROM Business "
        + "where (Categories LIKE '%Doctors%' OR  Categories LIKE '%Skin Care%' OR"
        + " Categories LIKE '%Health & Medica%' OR Categories LIKE '%Medical Centers%');";

    selectStmt = null;
    selectStmt = connection.prepareStatement(query2);
    results = selectStmt.executeQuery();

    while(results.next()) {
      ans.add(results.getInt("COUNT"));
    }

    // Financial Service
    String query3 = "SELECT Count(*) AS COUNT "
        + "FROM Business "
        + "where (Categories LIKE '%Banks & Credit Unions%' OR  Categories LIKE '%Insurance%' OR"
        + " Categories LIKE '%Tax Services%' OR Categories LIKE '%Payroll Services%');";

    selectStmt = null;
    selectStmt = connection.prepareStatement(query3);
    results = selectStmt.executeQuery();

    while(results.next()) {
      ans.add(results.getInt("COUNT"));
    }

    // Living
    String query4 = "SELECT Count(*) AS COUNT "
        + "FROM Business "
        + "where (Categories LIKE '%Home Services%' OR  Categories LIKE '%Real Estate%' OR"
        + " Categories LIKE '%Apartments%' OR Categories LIKE '%Community Centers%' OR Categories LIKE '%Community Centers%' OR Categories LIKE '%Community Centers%');";

    selectStmt = null;
    selectStmt = connection.prepareStatement(query4);
    results = selectStmt.executeQuery();

    while(results.next()) {
      ans.add(results.getInt("COUNT"));
    }

    // Shopping
    String query5 = "SELECT Count(*) AS COUNT "
        + "FROM Business "
        + "where (Categories LIKE '%Toy Stores%' OR  Categories LIKE '%Electronics%' OR"
        + " Categories LIKE '%Fashion%' OR Categories LIKE '%Shoe Stores%' OR Categories LIKE '%Women''s Clothing%' OR Categories LIKE '%Tobacco Shops%' "
        + "OR Categories LIKE '%Wine & Spirits%');";

    selectStmt = null;
    selectStmt = connection.prepareStatement(query5);
    results = selectStmt.executeQuery();

    while(results.next()) {
      ans.add(results.getInt("COUNT"));
    }

    // Others
    String query6 = "SELECT Count(*) AS COUNT "
        + "FROM Business "
        + "where (Categories LIKE '%Gas Stations%' OR  Categories LIKE '%Laundry Services%' OR"
        + " Categories LIKE '%Car Dealers%' OR Categories LIKE '%Auto Repair%' OR Categories LIKE '%Pet Services%');";

    selectStmt = null;
    selectStmt = connection.prepareStatement(query6);
    results = selectStmt.executeQuery();

    while(results.next()) {
      ans.add(results.getInt("COUNT"));
    }
    System.out.println(ans.size());

    return ans;
  }



  //postQuery05
  @CrossOrigin
  @PostMapping(path="/postQuery05")
  public ArrayList<Integer> postQuery05 (@RequestBody String temp1) throws Exception {
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
    String query = "SELECT COUNT(*) AS CC "
        + "FROM Business "
        + "where (";
    for(int i = 0; i< cons.size(); i++){
      query = query + "Categories LIKE '%" + keywords[i] + "%' ";
      if(i != cons.size()-1){
        query = query + " OR ";
      }
    }
    query = query + "); ";

    PreparedStatement selectStmt = null;
    selectStmt = connection.prepareStatement(query);
    ResultSet results = null;
    results = selectStmt.executeQuery();

    ArrayList<Integer> ans = new ArrayList<>();
    results.next();
    ans.add(results.getInt("CC"));

    // Others
    String query2 = "SELECT Count(*) AS CC "
        + "FROM Business; ";

    selectStmt = null;
    selectStmt = connection.prepareStatement(query2);
    results = selectStmt.executeQuery();

    results.next();
    ans.add(results.getInt("CC"));


    return ans;
  }




}
