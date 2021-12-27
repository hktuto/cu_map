
import { acceptHMRUpdate, defineStore } from "pinia";
import { ref, watch } from "vue-demi";
import { useQuery, useResult } from '@vue/apollo-composable'
import gql from "graphql-tag";

const baseURL = 'http://localhost:1337'

type Response = {
  distrists: Distrist[];
};

export type DistrictPin = {
  x: number;
  y: number;
  icon: string;
  detailImg: string;
  detailContent: string;
};

export type Distrist = {
  name: string;
  bgColor: string;
  coverColor: string;
  mapIcon: string;
  mapPin: DistrictPin[];
  homeIcon: string;
  homeIconX: number;
  homeIconY: number;
};

export const useDistrictStore = defineStore("distrist", () => {

  const { result, loading } = useQuery(gql`
      query GetAll {
        main{
          data{
            attributes{
              
              bg{
                data{
                  attributes{
                    url
                  }
                }
              }
              
              menuOpen{
                data{
                  attributes{
                    url
                  }
                }
              }
              
              menuClose{
                data{
                  attributes{
                    url
                  }
                }
              }
              
              info{
                data{
                  attributes{
                    url
                  }
                }
              }
              
            }
          }
        }
        districts(pagination:{pageSize:999}){
          data{
            attributes{
              name
              bgColor
              coverColor
              homeIconX
              homeIconY
              homeIcon{
                data{
                  attributes{
                    url
                  }
                }
              }
              mapIcon{
                data{
                  attributes{
                    url
                  }
                }
              }
              mapPin{
                data{
                  attributes{
                    x
                    y
                    icon{
                      data{
                        attributes{
                          url
                        }
                      }
                    }
                    
                    detailImg{
                      data{
                        attributes{
                          url
                        }
                      }
                    }
                    
                    detailContent{
                      data{
                        attributes{
                          url
                        }
                      }
                    }
                    
                    
                  }
                }
              }
            }
          }
        }
      }
    `)
    const channels = useResult(result, [])
  const allDistrist = ref<Distrist[]>([]);

  const getCurrentDistrist = (name: String) => {
    return allDistrist.value.find((d) => d.name === name);
  };

  const main = ref<any>()

  watch( channels , (ch) => {
    if(ch){
      main.value = {
        bg : baseURL + ch.main.data.attributes.bg.data.attributes.url,
        info: baseURL + ch.main.data.attributes.info.data.attributes.url,
        menuClose: baseURL + ch.main.data.attributes.menuClose.data.attributes.url,
        menuOpen: baseURL + ch.main.data.attributes.menuOpen.data.attributes.url,
      };
      allDistrist.value = ch.districts.data.reduce((result:Distrist[], {attributes}:any)=>{
        const district = {
          ...attributes,
          homeIcon: baseURL + attributes.homeIcon.data.attributes.url,
          mapIcon: baseURL + attributes.mapIcon.data.attributes.url,
          mapPin: attributes.mapPin.data.map(({attributes:mapAttr}:any) => {
            return {
              ...mapAttr,
              detailContent: baseURL + mapAttr.detailContent.data.attributes.url,
              detailImg: baseURL + mapAttr.detailImg.data.attributes.url,
              icon: baseURL + mapAttr.icon.data.attributes.url
            }
          })
        }
        result.push(district)
        return result
      }, [] )
      console.log(allDistrist.value, main.value)
    }
  })

  return {
    main,
    allDistrist,
    getCurrentDistrist,
    channels,
    loading,
  };
});
