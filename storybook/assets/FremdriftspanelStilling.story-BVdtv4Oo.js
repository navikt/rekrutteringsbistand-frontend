import{ak as I,al as w,j as t,R as k,S as j,c7 as x,cy as b,c9 as g,cK as u,aK as y,cL as _}from"./iframe-ByWmnZ4S.js";import{w as d,c as D}from"./ContextDecorators-BiJDcsY5.js";import{F as N,A as v}from"./FullførtStilling-BpSSxCWe.js";import{R as T}from"./GjenåpneStillingKnapp-DlT1PbK2.js";import{T as A}from"./TilgangskontrollForInnhold-BySSlBvy.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CUwd8fGk.js";import"./OrganisasjonsnummerAlert-CIoaQ-va.js";import"./VStack-B4XMgije.js";import"./BasePrimitive-C0gkeO-o.js";import"./List-Bcp7Rviy.js";import"./Link-C0isikOf.js";import"./KandidatHendelseTag-D-PJ3Xds.js";import"./Tag-C7-_VXzn.js";import"./FileXMark-E6OErK0C.js";import"./Trash-C5n-8O5T.js";import"./HandShakeHeart-KCiOrMlu.js";import"./Calendar-BVNdHGpL.js";import"./ThumbUp-CjkUot_o.js";import"./Table-vR1KG8v5.js";import"./util-2p2A_6-L.js";import"./format-CFhjL3vv.js";import"./match-B8PDa1K1.js";import"./parse-BMZ-zCRH.js";import"./getDefaultOptions-C7xXZp1I.js";import"./parseISO-DxVXcsl2.js";import"./util-DCpp2D90.js";import"./accordion-DO2PL0HR.js";import"./index-BietFGYF.js";import"./index-BPKUr0L8.js";import"./index-CmBuA3ho.js";import"./ChevronDown-CVtl9GHt.js";import"./Box-BoyTWisV.js";import"./Bell-BELNKcsR.js";import"./PersonChat-DFEw07nB.js";import"./Eye-B2sr2GTr.js";import"./ProgressBar-BDPB-Ghv.js";import"./EyeSlash-WZZq7lgy.js";import"./CircleSlash-CqeURTDn.js";import"./Modal-Dy3ua6M0.js";import"./floating-ui.react-BJvj_AEa.js";import"./Date.Input-BeE2dgD5.js";import"./useFormField-PacwHw8j.js";import"./useControllableState-DHgIwWjk.js";import"./Modal.context-MWwuFtiw.js";import"./Checkbox-CkXX_Nbz.js";import"./Fieldset-P5xqhKa_.js";import"./Pencil-DeAQBzbC.js";import"./PersonbrukerTekst-Cl-S2S-v.js";import"./ClockDashed-O8elurXX.js";import"./Tasklist-DGsW8bjp.js";import"./ErrorBoundary-BWz94SbX.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),m=w(i,E),c=m.error;return c?.status===404||c?.message?.includes("404")||c&&!m.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[m],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,K=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,B=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=B+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:K,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const vt={tags:["autodocs"],component:n},l={render:()=>d(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>d(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return d(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return d(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
