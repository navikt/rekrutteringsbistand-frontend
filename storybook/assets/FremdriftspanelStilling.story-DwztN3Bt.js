import{ax as I,ay as w,j as t,R as k,S as x,c7 as j,cy as y,c9 as g,cK as u,aL as b,cL as _}from"./iframe-B5lap-Ku.js";import{w as d,c as D}from"./ContextDecorators-e6rh6jqN.js";import{F as N,A as v}from"./FullførtStilling-qWtmTQsT.js";import{R as T}from"./GjenåpneStillingKnapp-DIM99OR_.js";import{T as A}from"./TilgangskontrollForInnhold-DIYn97r1.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-C0nj-sEy.js";import"./OrganisasjonsnummerAlert-Cid1IVtu.js";import"./VStack-BAOUzk4Q.js";import"./BasePrimitive-JTxShD_Z.js";import"./List-BTCphmi9.js";import"./Link-B4ZX8J7S.js";import"./KandidatHendelseTag-DC5SqOk2.js";import"./Tag-DijBKXLj.js";import"./FileXMark-BONsLRyz.js";import"./Trash-ADvoL7uR.js";import"./HandShakeHeart-CrVsSIsC.js";import"./Calendar-nE1M2tRJ.js";import"./ThumbUp-CJ1CrxUC.js";import"./Table-DXoj44Y2.js";import"./util-9NfOLJI3.js";import"./format-C3YakQiN.js";import"./match-Dfp5Gb3j.js";import"./parse-DwqJeXH-.js";import"./getDefaultOptions-C7m5dLFw.js";import"./parseISO-Cd2_vPbt.js";import"./util-BCPyWica.js";import"./accordion-ByVtFOsY.js";import"./index-CpLFBsrp.js";import"./index-D3UD-CWb.js";import"./index-DrVyeSGN.js";import"./ChevronDown-ZgbNc0TD.js";import"./Box-evoQdz2a.js";import"./Bell-B6uJlAwx.js";import"./PersonChat-VH_52g-U.js";import"./Eye-CM-dWIiZ.js";import"./ProgressBar-DW7GdXlM.js";import"./EyeSlash-F26YTRmz.js";import"./CircleSlash-BPOUDHjM.js";import"./Modal-L55sw-mH.js";import"./floating-ui.react-DL-ezC40.js";import"./Date.Input-Bqz9kZmu.js";import"./useFormField-CbCCiLm3.js";import"./useControllableState-DGruGuX1.js";import"./Modal.context-ZJjq0Plj.js";import"./Checkbox-Cxwf7aOa.js";import"./Fieldset-XYX_IU_r.js";import"./Pencil-BCuOz38C.js";import"./PersonbrukerTekst-BrJj0H4M.js";import"./ClockDashed-x3yWsARX.js";import"./Tasklist-EBVEayyk.js";import"./ErrorBoundary-CLvoPt7r.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),m=w(i,E),c=m.error;return c?.status===404||c?.message?.includes("404")||c&&!m.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[m],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===y.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const vt={tags:["autodocs"],component:n},l={render:()=>d(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>d(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:b.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return d(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return d(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />)
}`,...l.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />)
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...a.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => {
    const stillingsData = mockFormidling as typeof mockBaseStilling;
    const liste = createKandidatlisteMock({
      stillingsData,
      antall: 2
    });
    return withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />, liste, stillingsData);
  }
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,vt as default};
