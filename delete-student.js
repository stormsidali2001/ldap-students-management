const ldap = require('ldapjs');
if(process.argv.length  <3) throw new Error("you should provide at least 1 arguments to the program (the dn)")
const client = ldap.createClient({
    url:"ldap://localhost:10389",
    
});
console.log("connecting to ldap server at ldap://localhost:10389")
const dn = "uid=admin,ou=system",password = "secret"
client.bind(dn,password,(err)=>{
    if(err){
        console.log("LDAP ERROR: ",err)
    }else{
        
        client.del(`cn=${process.argv[2]},ou=student,dc=sba,dc=com`, (err) => {
            if(err){
                throw new Error("LDAP INSERTION ERROR: "+err)
            }
            console.log(`cn=${process.argv[2]},ou=student,dc=sba,dc=com !`)
          });
    }
})