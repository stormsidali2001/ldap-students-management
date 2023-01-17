const ldap = require('ldapjs');
if(process.argv.length  <4) throw new Error("you should provide at least 2 arguments to the program")
const client = ldap.createClient({
    url:"ldap://localhost:10389",
    
});
console.log("connecting to ldap server at ldap://localhost:10389")
const dn = "uid=admin,ou=system",password = "secret"
client.bind(dn,password,(err)=>{
    if(err){
        console.log("LDAP ERROR: ",err)
    }else{
        console.log("connected !!!--------------------------")
        const dn = `cn=${process.argv[2]},ou=student,dc=sba,dc=com`;
        const speciality =`cn=${process.argv[3]},ou=speciality,dc=sba,dc=com`;
        const change = new ldap.Change({
            operation: 'delete',
            modification: {
              member:dn
            }
          });
          
          client.modify(speciality, change, (err) => {
            if(err) throw new Error("error during the ldap modification.")
          });
      
    }
})