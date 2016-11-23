import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

const ButtonAnimated = () => (
  <div>
    <Button animated>
      <Button.Content visible>Search</Button.Content>
      <Button.Content hidden>
        <Icon name='search' />
      </Button.Content>
    </Button>
  </div>
)

export default ButtonAnimated
