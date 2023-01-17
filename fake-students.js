const ldap = require('ldapjs');
const faker = require("@faker-js/faker").faker;
faker.locale = 'fr';



if(process.argv.length  <3) throw new Error("you should provide at least 1 arguments to the program")
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
        for(let i=0;i<process.argv[2];i++){
            const sn = faker.name.fullName()
            const cn = faker.name.fullName().replace(" ","-")
            console.log(`cn=${cn},ou=student,dc=sba,dc=com`,)
            const entry = {
                cn,
                sn,
                // email: ['foo@bar.com', 'foo1@bar.com'],
                objectclass: 'inetOrgPerson'
              };
            client.add(`cn=${cn},ou=student,dc=sba,dc=com`, entry, (err) => {
                if(err){
                    console.log("LDAP INSERTION ERROR: "+err)
                }
              });
        }
     
    }
})