const ldap = require('ldapjs');




function authDn({dn,password}){
    const client = ldap.createClient({
        url:"ldap://localhost:10389",
        
    });
    client.bind(dn,password,(err)=>{
        if(err){
            console.log("LDAP ERROR: ",err)
        }else{
            console.log("connected succesfully")
            const opts = {
                filter: '(cn=*)',
                scope: 'sub',
                attributes: [ 'cn']
              };
              
              client.search('ou=student,dc=sba,dc=com', opts, (err, res) => {
                if(err){
                    throw err;
                }
            
                res.on('searchEntry', (entry) => {
                  console.log('entry: ' + JSON.stringify(entry.object));
                });
              
                res.on('error', (err) => {
                  console.error('error: ' + err.message);
                });
                res.on('end', (result) => {
                  console.log('status: ' + result.status);
                });
              });
        }
    })

}

authDn({dn:"uid=admin,ou=system",password:"secret"})