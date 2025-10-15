import{a5 as I,a_ as w,j as t,R as k,S as j,a6 as x,cq as b,ak as g,cC as u,av as _,cD as y}from"./iframe-BQJxXW9d.js";import{w as d,c as A}from"./ContextDecorators-DZvxpU2v.js";import{F as N,A as v}from"./FullførtStilling-CF4Jb1PV.js";import{R as T}from"./GjenåpneStillingKnapp-CTJXedyO.js";import{T as D}from"./TilgangskontrollForInnhold-cszMNwjN.js";import"./preload-helper-DoVtK-SO.js";import"./KandidatlisteContext-D4D8XnLI.js";import"./OrganisasjonsnummerAlert-B7rcSb93.js";import"./VStack-D46019rJ.js";import"./BasePrimitive-BXqzJcUK.js";import"./List-CLc-5LkB.js";import"./Link-C54rWlFd.js";import"./KandidatHendelseTag-BtekIJZA.js";import"./Tag-4Cs80-uM.js";import"./FileXMark-BO5hpNuR.js";import"./Trash-CWCFb2vA.js";import"./HandShakeHeart-D1cb5IZd.js";import"./Calendar-BUIPGPOk.js";import"./ThumbUp-DXl4UXEL.js";import"./Table-C4cRX3o4.js";import"./util-BXDIftOZ.js";import"./format-DADo9TEe.js";import"./match-DeTCyl7A.js";import"./parseISO-MzENUmKJ.js";import"./parse-BMXXm650.js";import"./getDefaultOptions-Crc8mJKE.js";import"./util-C9HMcIxj.js";import"./accordion-BZ1IY-82.js";import"./index-FtJCQBLx.js";import"./index-DKUtnKDx.js";import"./index-D-tTtTvz.js";import"./ChevronDown-D_v_0qT0.js";import"./Box-DChhigjR.js";import"./Bell-3KK8ZAT9.js";import"./PersonChat-CQ9jJyTD.js";import"./Eye-Bx3Sv1Q6.js";import"./ProgressBar-DY8V-EhD.js";import"./EyeSlash-BXhNvZe3.js";import"./CircleSlash-CP35Tfes.js";import"./Modal-B-K2myHi.js";import"./floating-ui.react-qbgNuRzq.js";import"./Date.Input-DkIuf96S.js";import"./useFormField-CC83feVF.js";import"./useControllableState-DLMKTCIV.js";import"./Modal.context-DxEobc4s.js";import"./Checkbox-OAbn9RAq.js";import"./Fieldset-B7WvKFrQ.js";import"./Pencil-DrSGBszE.js";import"./PersonbrukerTekst-C3A1MFZM.js";import"./ClockDashed-4me6Cry2.js";import"./Tasklist-D5G367Pq.js";import"./ErrorBoundary-DoZPJQ5u.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),m=w(i,E),c=m.error;return c?.status===404||c?.message?.includes("404")||c&&!m.isLoading?t.jsx(D,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(D,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[m],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const vt={tags:["autodocs"],component:n},l={render:()=>d(()=>t.jsx(n,{dropDown:!1}))},a={render:()=>d(()=>t.jsx(n,{dropDown:!0}))},o={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=A({lukket:!0,antall:4,status:_.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return d(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=y,i=A({stillingsData:r,antall:2});return d(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />)
}`,...l.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />)
}`,...a.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => {
    // Lukket kandidatliste og stoppet stilling -> Fullført visning
    const stillingsData = {
      ...mockBaseStilling,
      stilling: {
        ...mockBaseStilling.stilling,
        status: 'INACTIVE',
        publishedByAdmin: mockBaseStilling.stilling.publishedByAdmin || new Date().toISOString()
      }
    } as typeof mockBaseStilling;
    const liste = createKandidatlisteMock({
      lukket: true,
      antall: 4,
      status: InternKandidatstatus.AKTUELL,
      utfall: KandidatutfallTyper.FATT_JOBBEN,
      stillingsData
    });
    return withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />, liste, stillingsData);
  }
}`,...o.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => {
    const stillingsData = mockFormidling as typeof mockBaseStilling;
    const liste = createKandidatlisteMock({
      stillingsData,
      antall: 2
    });
    return withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />, liste, stillingsData);
  }
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,a as AktivDropdown,p as FormidlingVariant,o as Fullført,vt as default};
