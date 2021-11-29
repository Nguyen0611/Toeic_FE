import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  OnChanges,
  OnInit,
  OnDestroy,
  SimpleChanges
} from '@angular/core';
import { isNil } from 'lodash';
import { TreeviewI18n, TreeviewItem, TreeviewConfig, DropdownTreeviewComponent, TreeviewHelper } from 'ngx-treeview';
import { DropdownTreeviewSelectI18n } from './dropdown-treeview-select-i18n';
import {takeUntil} from 'rxjs/operators';
import {NbMenuService} from '@nebular/theme';
import {Subject} from 'rxjs';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {isNumeric} from 'rxjs/internal-compatibility';


@Component({
  selector: 'ngx-treeview-custom',
  templateUrl: './treeview-custom.component.html',
  styleUrls: ['./treeview-custom.component.scss'],
  providers: [
    { provide: TreeviewI18n, useClass: DropdownTreeviewSelectI18n }
  ]
})
export class TreeviewCustomComponent implements OnChanges, OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.destroy$.next()
  }
  @Input() config: TreeviewConfig;
  @Input() items: TreeviewItem[];
  @Input() value: any;
  @Input() title: string;
  @Input() supportUncheck: boolean = false;
  @Output() valueChange = new EventEmitter<any>();
  @Output() menuClick = new EventEmitter<any>();
  @Input() showContextMenu: boolean
  @ViewChild(DropdownTreeviewComponent, { static: false }) dropdownTreeviewComponent: DropdownTreeviewComponent;
  @Input() menus: any[];
  @Output() dropChange = new EventEmitter<any>();
  @Input() hasDrag: boolean;
  @Output() onMove = new EventEmitter<any>();
  itemLocal: any[] = []
  private destroy$: Subject<void> = new Subject<void>();
  filterText: string;
  private dropdownTreeviewSelectI18n: DropdownTreeviewSelectI18n;
  @Input() overflow: boolean;

  constructor(
    public i18n: TreeviewI18n,
    private menuService: NbMenuService,
  ) {
    this.config = TreeviewConfig.create({
      hasAllCheckBox: false,
      hasCollapseExpand: false,
      hasFilter: true,
      maxHeight: 500
    });
    this.dropdownTreeviewSelectI18n = i18n as unknown as DropdownTreeviewSelectI18n;
  }



  select(item: TreeviewItem, isHidden): void {
    if (!isHidden) {
    this.selectItem(item);
    }
  }

  private updateSelectedItem(): void {
    if (!isNil(this.items)) {
      const selectedItem = TreeviewHelper.findItemInList(this.items, this.value);
      this.selectItem(selectedItem);
    }
  }

  private selectItem(item: TreeviewItem): void {
    if (this.dropdownTreeviewSelectI18n.selectedItem !== item) {
      this.dropdownTreeviewSelectI18n.selectedItem = item;
      if (this.dropdownTreeviewComponent) {
        this.dropdownTreeviewComponent.onSelectedChange([item]);
      }

      if (item) {
        // if (!this.value || (this.value && this.value.value !== item.value)) {
        this.value = item;
        this.valueChange.emit(item);
        // }
      }
    } else if (this.supportUncheck) {
        this.dropdownTreeviewSelectI18n.selectedItem = null;
        this.value = null;
        this.valueChange.emit(null);
    }
  }

  clearData() {
    this.value = null;
    this.valueChange.emit(null);
  }

  ngOnInit(): void {
    this.menuService.onItemClick()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((event: any) => {
          this.menuClick.emit(event)
        }
      );
  }
  drop($event: any) {
    this.dropChange.emit($event)
  }
  onSelectedChange($event: any[]) {
  }

  onFilterChange($event: string) {
  }

  checkIndex(item) {

  }

  getIndex(item: any) {
    const listId = this.items.map(e => e.value.id)
    const i = listId.indexOf(item.value.id)
    if (i === (this.items.length - 1)) {
      return false;
    } else return true  }

  moveItem(move: string, value) {
    const data = {
      data: value,
      move: move
    }
    this.onMove.emit(data)
  }

  getMenu(item: any) {
    let menu = this.menus
    if (menu)
    if (item.isDefault ) {
      if (menu) {
        menu = menu.filter(c => {
          if (item.isHidden) {
            if (c.target !== 'hideColumn') return c
          } else if (c.target !== 'showColumn') {
            return c
          }
        })
      }
      menu = menu.filter(c => {
        if (c.target !== 'deleteCategoryColumn' && c.target !== 'addChildColumn') {
          return c
        }
      })
      if (item.idx <= 3) {
        menu = menu.filter(c => {
          if (c.target !== 'addColumnBellow') {
            return c
          }
        })
      }
    } else {
      if (menu) {
        menu = menu.filter(c => {
          if (c.target !== 'hideColumn' && c.target !== 'showColumn') return c
        })
      }
    }
    return menu
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.items) {
      this.itemLocal = this.getMenuForTree(changes.items.currentValue);
      // console.log(this.itemLocal)
      this.updateSelectedItem();
    }
  }
  getMenuForTree(data) {
    for (let i = 0; i < data.length; i++) {
      const e = data[i]
      if (e) {
        if (!isNumeric(e.value)) {
          e.value.menu = this.getMenu(e.value)
          if (e.children) {
            const child = e.children;
            this.getMenuForTree(child)
          }
        }
      }
    }
    return data;
  }
}
