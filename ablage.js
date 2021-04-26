async function loginAsGuest() {
    try {
        let response = await fetch('http://localhost/login.php', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                        'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                guest: true
            })
          });
        let responseJson = await response.json();
        console.log(responseJson);
        setToken(responseJson.token);
    }
    catch (error) {
        console.error(error);
    }
}       
async function getData() {
    try {
        if (!token) {
            loginAsGuest();
            console.log(token);
        }
        let response = await fetch(
            'http://localhost/api/get_posts.php?token='+token,
        );
        let responseJson = await response.json();
        console.log(responseJson);
        setDiscussionpostsArray(responseJson.postData);
        return responseJson;
    }
    catch (error) {
        console.error(error);
    }
}
function ShowPosts() {
    if (discussionpostsArray.length > 0) {
        discussionpostsArray.map((post, index) => {

            return (
                <View key={index} style={styles.discussionpostWrapper}>
                    <View key={'post'+index.toString()} style={styles.discussionpost}>
                        <Text key={'title'+index.toString()} style={styles.discussionpostTitle}>{post.data.discussionpostTitle}</Text>
                        <Text key={'break'+index.toString()}> </Text>
                        <Text key={'body'+index.toString()} style={styles.discussionpostBody}>{post.data.discussionpostBody}</Text>
                        <Text key={'link'+index.toString()} style={{color:'red'}}>read more</Text>
                    </View>
                </View>
            );
        });
    }
    else {
        return (
            <View style={styles.discussionpostWrapper}>
                <View style={styles.discussionpost}>
                    <Text style={styles.discussionpostTitle}>No posts available.</Text>
                </View>
            </View>
        );
    }
}
return (
    <View style={styles.container}>

        <Text style={styles.header} onPress={getData}>Discuss My School</Text>
        
        <ScrollView>
            <ShowPosts></ShowPosts>
        </ScrollView>
    </View>
    );
            {/* <ActivityIndicator color="red" hidesWhenStopped={true} animating={isLoading} size="large" style={styles.load}></ActivityIndicator> */}

            useEffect(() => {
                // callApi();
                console.log();
                setArray([
                {
                    discussionpostTitle: 'Ich bin so nice. Das ist ein Titel, der nur zum Test dient.',
                    discussionpostBody: 'Das ist ein anderer Test 1. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test.',
                    discussionpostId: 1
                },
                {
                    discussionpostTitle: 'Ich bin so nice. Das ist ein Titel, der nur zum Test dient.',
                    discussionpostBody: 'Das ist ein anderer Test 2. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test.',
                    discussionpostId: 2
                },
                {
                    discussionpostTitle: 'Ich bin so nice. Das ist ein Titel, der nur zum Test dient.',
                    discussionpostBody: 'Das ist ein anderer Test 3 Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test.',
                    discussionpostId: 3
                },
                {
                    discussionpostTitle: 'Ich bin so nice. Das ist ein Titel, der nur zum Test dient.',
                    discussionpostBody: 'Das ist ein anderer Test 4. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test.',
                    discussionpostId: 4
                },
                ]);
            }, []);