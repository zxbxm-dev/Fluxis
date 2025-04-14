/* eslint-disable prettier/prettier */
import React from 'react';
import {Text, View} from 'react-native';
import {News} from '../screen/NewsScreen';
import {styles} from '../styles/components/NewsItems';
import {useNews} from '../context/NewsContext';

const NewsItems = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {newsData, setNewsData} = useNews();

  return (
    <View style={styles.newsContantItems}>
      {newsData.length > 0 ? (
        newsData?.map((item: News) => {
          const [date, time] = item.createdAt.split(' ');
          return (
            <View key={item.id} style={styles.newsContant}>
              <View style={styles.newsDateBox}>
                <Text style={styles.newsDate}>{date}</Text>
                <Text style={styles.newsDate}>{time}</Text>
              </View>
              <View style={styles.newsContantBox}>
                <Text style={styles.newsContantText}>
                  {item.name}님{'\n'}
                  안전을 위해 착용을 부탁드리겠습니다.{'\n'}
                  {item.isHelmetOn ? (
                    <>
                      <Text style={styles.newsContantWarn}>안전모 미착용</Text>
                      {'\n'}
                    </>
                  ) : null}
                  {item.isGoggleOn ? (
                    <>
                      <Text style={styles.newsContantWarn}>고글 미착용</Text>
                      {'\n'}
                    </>
                  ) : null}
                  {item.isShoesOn ? (
                    <>
                      <Text style={styles.newsContantWarn}>안전화 미착용</Text>
                      {'\n'}
                    </>
                  ) : null}
                  오늘도 안전한 하루 보내세요!
                </Text>
              </View>
            </View>
          );
        })
      ) : (
        <View style={styles.newsContant2}>
          <View style={styles.newsDateBox}>
            <Text style={styles.newsContantText2}>
              <Text style={styles.newsContantWarn}>
                이전 소식이 없습니다.{'\n'}
              </Text>
              오늘도 안전한 하루 보내세요!
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default NewsItems;
