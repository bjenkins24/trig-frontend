import React, { useEffect, useState } from 'react';
import {
  ButtonToggle,
  Icon,
  Card,
  Avatar,
  HorizontalGroup,
  List,
  ListItem,
  ListItemContent,
  FileIcon,
} from '@trig-app/core-components';
import StackGrid from 'react-stack-grid';
import format from 'date-fns/format';
import { client } from '../utils/apiClient';

const CardView = () => {
  const [view, setView] = useState('thumbnail');
  const [cards, setCards] = useState(null);

  useEffect(() => {
    const getClients = async () => {
      if (cards) return false;
      const response = await client('cards');
      setCards(response.data);
      return response;
    };
    getClients();
  });

  return (
    <div>
      <ButtonToggle>
        <Icon type="row-view" onClick={() => setView('row')} size={1.6} />
        <Icon
          type="thumbnail-view"
          onClick={() => setView('thumbnail')}
          size={1.6}
        />
      </ButtonToggle>
      {cards && view === 'thumbnail' && (
        <StackGrid columnWidth={251} gutterWidth={16} gutterHeight={16}>
          {cards.map(({ id, title, actual_created_at: createdAt }) => {
            return (
              <Card
                onClick={() => null}
                key={id}
                title={title}
                dateTime={new Date(createdAt)}
                type="youtube"
                renderAvatar={() => {
                  return <Avatar size={1.6} />;
                }}
                totalFavorites={0}
                isFavorited={false}
                totalComments={0}
                onClickFavorite={() => null}
                onClickComment={() => null}
                navigationList={[
                  {
                    onClick: () => null,
                    item: (
                      <HorizontalGroup margin={1.6}>
                        <Icon type="new-window" size={1.6} />
                        <span>Open in New Window</span>
                      </HorizontalGroup>
                    ),
                  },
                  {
                    onClick: () => null,
                    item: (
                      <HorizontalGroup margin={1.6}>
                        <Icon type="edit" size={1.6} />
                        <span>Edit Card</span>
                      </HorizontalGroup>
                    ),
                  },
                  {
                    onClick: () => null,
                    item: (
                      <HorizontalGroup margin={1.6}>
                        <Icon type="lock" size={1.6} />
                        <span>Share</span>
                      </HorizontalGroup>
                    ),
                  },
                  {
                    onClick: () => null,
                    item: (
                      <HorizontalGroup margin={1.6}>
                        <Icon type="trash" size={1.6} />
                        <span>Remove From Trig</span>
                      </HorizontalGroup>
                    ),
                  },
                ]}
              />
            );
          })}
        </StackGrid>
      )}

      {cards && view === 'row' && (
        <List>
          {cards.map(({ title, actual_created_at: createdAt }) => {
            return (
              <ListItem
                onClick={() => null}
                renderItem={() => <FileIcon type="doc" size={2.4} />}
                renderContent={() => (
                  <ListItemContent
                    renderItem={() => <Avatar size={4} />}
                    primary={title}
                    secondary={format(new Date(createdAt), 'MMM d, yyyy')}
                  />
                )}
                actions={[
                  <Icon
                    onClick={() => null}
                    type="heart"
                    color="s"
                    size={1.6}
                  />,
                  <Icon
                    type="comment"
                    color="s"
                    size={1.6}
                    onClick={() => null}
                  />,
                  <Icon
                    type="horizontal-dots"
                    color="s"
                    size={1.6}
                    onClick={() => null}
                  />,
                ]}
              />
            );
          })}
        </List>
      )}
    </div>
  );
};

export default CardView;
