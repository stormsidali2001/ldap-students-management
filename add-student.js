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
        const entry = {
            cn: process.argv[2],
            sn: process.argv[3],
            // email: ['foo@bar.com', 'foo1@bar.com'],
            objectclass: 'inetOrgPerson'
          };
        client.add(`cn=${process.argv[2]},ou=student,dc=sba,dc=com`, entry, (err) => {
            if(err){
                console.log("LDAP INSERTION ERROR: "+err)
            }
          });
    }
})